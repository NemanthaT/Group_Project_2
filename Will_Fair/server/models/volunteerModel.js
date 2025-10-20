import pool from "../db.js";

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

export {
    createVolunteer,
    updateVolunteerCount,
    getEventDetailsForEmail
};

