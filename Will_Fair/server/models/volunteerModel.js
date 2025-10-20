import pool from "../db.js";

// Creates a new volunteer record and returns the volunteer ID
const createVolunteer = async (client, { event_id, volunteer_name, volunteer_email, volunteer_phone, notes, volunteerKey }) => {
    const insertQuery = `
      INSERT INTO event_volunteers (event_id, volunteer_name, volunteer_email, volunteer_phone, notes, volunteer_key)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING volunteer_id;
    `;
    return client.query(insertQuery, [event_id, volunteer_name, volunteer_email, volunteer_phone, notes || null, volunteerKey]);
};

const updateVolunteerCount = async (client, event_id) => {
    const updateQuery = `
      UPDATE events
      SET volunteers_signed = volunteers_signed + 1
      WHERE event_id = $1;
    `;
    return client.query(updateQuery, [event_id]);
};


const getEventDetailsForEmail = async (client, event_id) => {
    const eventQuery = `
      SELECT name as title, COALESCE(start_date, date) as event_date, location
      FROM events WHERE event_id = $1
    `;
    return client.query(eventQuery, [event_id]);
};

// Checks if the volunteer email matches the event organizer's email
const checkOrganizerEmail = async (client, event_id, volunteer_email)=>{
  const query = `
        SELECT organiser_email 
        FROM events e
        JOIN event_organisers eo ON e.organiser_id = eo.organiser_id
        WHERE e.event_id = $1 
        AND eo.organiser_email = $2
    `;
    return client.query(query, [event_id, volunteer_email]); 
}

export {
    createVolunteer,
    updateVolunteerCount,
    getEventDetailsForEmail,
    checkOrganizerEmail
};

