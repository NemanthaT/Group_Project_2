// Event Model for Mobile Backend
const pool = require('../config/db');

// Get all volunteer events with organiser info and attached documents
async function getEvents() {
    try {
        const sql = `
        SELECT
            e.event_id,
            e.name,
            e.description,
            e.type,
            e.commitment,
            e.location,
            e.skills,
            e.is_range,
            e.date,
            e.start_date,
            e.end_date,
            e.volunteers_needed,
            e.volunteers_signed,
            e.image_path,
            json_build_object(
                'organiser_id', o.organiser_id,
                'name', o.name,
                'email', o.email,
                'phone', o.phone
            ) AS organiser,
            COALESCE(d.docs, '[]'::json) AS documents
        FROM volunteer_events e
        LEFT JOIN volunteer_organisers o ON o.organiser_id = e.organiser_id
        LEFT JOIN (
            SELECT event_id, json_agg(json_build_object('document_id', document_id, 'filename', filename, 'path', path)) AS docs
            FROM event_documents
            GROUP BY event_id
        ) d ON d.event_id = e.event_id
        ORDER BY e.start_date DESC NULLS LAST, e.date DESC NULLS LAST
        `;

        const result = await pool.query(sql);
        return { success: true, events: result.rows };
    } catch (err) {
        console.error("Error in getEvents:", err);
        return { success: false, message: "Database query error" };
    }
}

// Get a single event by ID
async function getEventById(eventId) {
    try {
        const sql = `
        SELECT
            e.event_id,
            e.name,
            e.description,
            e.type,
            e.commitment,
            e.location,
            e.skills,
            e.is_range,
            e.date,
            e.start_date,
            e.end_date,
            e.volunteers_needed,
            e.volunteers_signed,
            e.image_path,
            json_build_object(
                'organiser_id', o.organiser_id,
                'name', o.name,
                'email', o.email,
                'phone', o.phone
            ) AS organiser,
            COALESCE(d.docs, '[]'::json) AS documents
        FROM volunteer_events e
        LEFT JOIN volunteer_organisers o ON o.organiser_id = e.organiser_id
        LEFT JOIN (
            SELECT event_id, json_agg(json_build_object('document_id', document_id, 'filename', filename, 'path', path)) AS docs
            FROM event_documents
            GROUP BY event_id
        ) d ON d.event_id = e.event_id
        WHERE e.event_id = $1
        `;

        const result = await pool.query(sql, [eventId]);
        if (result.rows.length === 0) {
            return { success: false, message: "Event not found" };
        }
        return { success: true, event: result.rows[0] };
    } catch (err) {
        console.error("Error in getEventById:", err);
        return { success: false, message: "Database query error" };
    }
}

// Add a new organiser
async function addOrganiser({ name, email, phone }) {
    try {
        const sql = `
        INSERT INTO volunteer_organisers (name, email, phone)
        VALUES ($1, $2, $3)
        RETURNING organiser_id
        `;

        const result = await pool.query(sql, [name, email, phone]);
        return { success: true, organiserId: result.rows[0].organiser_id };
    } catch (err) {
        console.error("Error in addOrganiser:", err);
        return { success: false, message: "Failed to create organiser" };
    }
}

// Add a new event
async function addEvent({
    organiserId,
    name,
    isRange,
    date,
    startDate,
    endDate,
    description,
    volunteersNeeded,
    location,
    type,
    commitment,
    skills,
    imagePath
}) {
    try {
        const sql = `
        INSERT INTO volunteer_events (
            organiser_id,
            name,
            is_range,
            date,
            start_date,
            end_date,
            description,
            volunteers_needed,
            volunteers_signed,
            location,
            type,
            commitment,
            skills,
            image_path
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING event_id
        `;

        const result = await pool.query(sql, [
            organiserId,
            name,
            isRange,
            !isRange ? date : null,
            isRange ? startDate : null,
            isRange ? endDate : null,
            description,
            volunteersNeeded,
            0, // volunteers_signed starts at 0
            location,
            type,
            commitment,
            skills,
            imagePath
        ]);

        return { success: true, eventId: result.rows[0].event_id };
    } catch (err) {
        console.error("Error in addEvent:", err);
        return { success: false, message: "Failed to create event" };
    }
}

// Update event image path
async function updateEventImage(eventId, imagePath) {
    try {
        const sql = `
        UPDATE volunteer_events
        SET image_path = $2
        WHERE event_id = $1
        `;

        await pool.query(sql, [eventId, imagePath]);
        return { success: true };
    } catch (err) {
        console.error("Error in updateEventImage:", err);
        return { success: false, message: "Failed to update event image" };
    }
}

// Add documents for an event
async function addDocuments(eventId, documentData) {
    try {
        if (!documentData || documentData.length === 0) {
            return { success: true };
        }

        const values = documentData.map((doc, idx) => {
            const offset = idx * 3;
            return `($${offset + 1}, $${offset + 2}, $${offset + 3})`;
        }).join(', ');

        const params = documentData.flatMap(doc => [eventId, doc.filename, doc.path]);

        const sql = `
        INSERT INTO event_documents (event_id, filename, path)
        VALUES ${values}
        `;

        await pool.query(sql, params);
        return { success: true };
    } catch (err) {
        console.error("Error in addDocuments:", err);
        return { success: false, message: "Failed to add documents" };
    }
}

module.exports = { 
    getEvents, 
    getEventById,
    addOrganiser,
    addEvent,
    updateEventImage,
    addDocuments
};
