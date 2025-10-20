// Event Model for Mobile Backend
const pool = require('../config/db');

// Get all volunteer events with organiser info and attached documents
async function getEvents() {
    try {
        console.log("=== Starting getEvents query ===");
        
        // First, let's test if the tables exist
        const testQuery = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name IN ('events', 'event_organisers')
        `);
        console.log("Available tables:", testQuery.rows);
        
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
            '[]'::json AS documents
        FROM events e
        LEFT JOIN event_organisers o ON o.organiser_id = e.organiser_id
        ORDER BY e.start_date DESC NULLS LAST, e.date DESC NULLS LAST
        `;

        console.log("Executing query:", sql);
        const result = await pool.query(sql);
        console.log("Query successful! Rows returned:", result.rows.length);
        return { success: true, events: result.rows };
    } catch (err) {
        console.error("=== ERROR in getEvents ===");
        console.error("Error object:", err);
        console.error("Error message:", err.message);
        console.error("Error code:", err.code);
        console.error("Error detail:", err.detail);
        console.error("Error hint:", err.hint);
        console.error("Error stack:", err.stack);
        console.error("========================");
        return { success: false, message: `Database query error: ${err.message}` };
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
            e.event_key,
            json_build_object(
                'organiser_id', o.organiser_id,
                'name', o.name,
                'email', o.email,
                'phone', o.phone
            ) AS organiser,
            COALESCE(
                (
                    SELECT json_agg(
                        json_build_object(
                            'document_id', d.document_id,
                            'filename', d.filename,
                            'path', d.path,
                            'uploaded_at', d.uploaded_at
                        )
                    )
                    FROM event_documents d
                    WHERE d.event_id = e.event_id
                ),
                '[]'::json
            ) AS documents
        FROM events e
        LEFT JOIN event_organisers o ON o.organiser_id = e.organiser_id
        WHERE e.event_id = $1
        `;

        const result = await pool.query(sql, [eventId]);
        if (result.rows.length === 0) {
            return { success: false, message: "Event not found" };
        }
        return { success: true, event: result.rows[0] };
    } catch (err) {
        console.error("=== ERROR in getEventById ===");
        console.error("Error object:", err);
        console.error("Error message:", err.message);
        console.error("Error code:", err.code);
        console.error("Error detail:", err.detail);
        console.error("Error hint:", err.hint);
        console.error("Error stack:", err.stack);
        console.error("===========================");
        return { success: false, message: `Database query error: ${err.message}` };
    }
}

module.exports = { 
    getEvents, 
    getEventById 
};