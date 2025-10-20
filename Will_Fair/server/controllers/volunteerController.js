import pool from "../db.js";
import { generateVolunteerKey } from "../models/eventModel.js";
import { sendEmail } from "../services/emailService.js";
import { volunteerRegistrationTemplate } from "../services/emailTemplates.js";

export const registerVolunteer = async (req, res) => {
  const { event_id, volunteer_name, volunteer_email, volunteer_phone, notes } = req.body;

  if (!event_id || !volunteer_name || !volunteer_email || !volunteer_phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    //generate volunteer key
    const volunteerKey = generateVolunteerKey();

    const insertQuery = `
      INSERT INTO event_volunteers (event_id, volunteer_name, volunteer_email, volunteer_phone, notes, volunteer_key)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING volunteer_id;
    `;
    const { rows } = await client.query(insertQuery, [
      event_id,
      volunteer_name,
      volunteer_email,
      volunteer_phone,
      notes || null,
      volunteerKey
    ]);

   
    const updateEvent = `
      UPDATE events
      SET volunteers_signed = volunteers_signed + 1
      WHERE event_id = $1;
    `;
    await client.query(updateEvent, [event_id]);



    // Get event details for the email
    const eventQuery = `
      SELECT name as title, COALESCE(start_date, date) as event_date, location
      FROM events WHERE event_id = $1
    `;
    const eventResult = await client.query(eventQuery, [event_id]);
    const eventDetails = eventResult.rows[0];

    // Send confirmation email with volunteer key
    try {
      const emailData = {
        volunteerName: volunteer_name,
        volunteerEmail: volunteer_email,
        eventTitle: eventDetails.title,
        eventDate: eventDetails.event_date,
        eventLocation: eventDetails.location,
        secretKey: volunteerKey
      };
      
      const { subject, text, html } = volunteerRegistrationTemplate(emailData);
      await sendEmail({ to: volunteer_email, subject, text, html });
    } catch (emailError) {
      console.error('Error sending volunteer confirmation email:', emailError);
      // Continue with registration even if email fails
    }

    await client.query("COMMIT");
    res.status(201).json({
      success: true,
      data: {
        message: "Thank you for volunteering! Please check your email for your volunteer key.",
        volunteer_id: rows[0].volunteer_id,
        volunteer_key: volunteerKey
      }
    });
  } catch (err) {
    await client.query("ROLLBACK");

    // Handle duplicate volunteer error
    if (err.code === "23505") {
      return res
        .status(400)
        .json({ error: "This email has already volunteered for this event." });
    }

    console.error("Error registering volunteer:", err);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
};
