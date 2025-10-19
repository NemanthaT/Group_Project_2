import pool from "../db.js"; // adjust this if your pool file path differs

//import GENERATE VOLUNTEER SECRET KEY function here from eventModal.js


export const registerVolunteer = async (req, res) => {
  const { event_id, volunteer_name, volunteer_email, volunteer_phone, notes } = req.body;

  if (!event_id || !volunteer_name || !volunteer_email || !volunteer_phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 1️⃣ Insert into event_volunteers



//PUT GENERATE SECRET Key functions here
//Edit Query to include secret key insertion



    const insertQuery = `
      INSERT INTO event_volunteers (event_id, volunteer_name, volunteer_email, volunteer_phone, notes)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING volunteer_id;
    `;
    const { rows } = await client.query(insertQuery, [
      event_id,
      volunteer_name,
      volunteer_email,
      volunteer_phone,
      notes || null,
      //PUT SECRET KEY VARIABLE here
    ]);

    // 2️⃣ Increment volunteers_signed in events table
    const updateEvent = `
      UPDATE events
      SET volunteers_signed = volunteers_signed + 1
      WHERE event_id = $1;
    `;
    await client.query(updateEvent, [event_id]);



    //Gmail API to send confirmation email to volunteer with secret key


    

    await client.query("COMMIT");
    res.status(201).json({
      message: "Volunteer registered successfully",
      volunteer_id: rows[0].volunteer_id,
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
