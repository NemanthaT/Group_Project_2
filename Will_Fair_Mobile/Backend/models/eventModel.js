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
            json_build_object(
                'organiser_id', o.organiser_id,
                'name', o.name,
                'email', o.email,
                'phone', o.phone
            ) AS organiser,
            '[]'::json AS documents
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

// Create a new event with organiser and documents
async function createEvent(eventData) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // 1. Insert or get organiser
        let organiserId;
        const organiserCheck = await client.query(
            'SELECT organiser_id FROM event_organisers WHERE email = $1',
            [eventData.contactEmail]
        );

        if (organiserCheck.rows.length > 0) {
            organiserId = organiserCheck.rows[0].organiser_id;
        } else {
            const organiserInsert = await client.query(
                `INSERT INTO event_organisers (name, email, phone, created_at, updated_at) 
                 VALUES ($1, $2, $3, NOW(), NOW()) 
                 RETURNING organiser_id`,
                [eventData.contactName, eventData.contactEmail, eventData.contactNumber]
            );
            organiserId = organiserInsert.rows[0].organiser_id;
        }

        // 2. Insert event
        const isRange = eventData.isRange === true || eventData.isRange === 'true';
        const eventInsert = await client.query(
            `INSERT INTO events (
                name, description, type, commitment, location, skills,
                is_range, date, start_date, end_date,
                volunteers_needed, volunteers_signed,
                image_path, organiser_id,
                created_at, updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), NOW())
            RETURNING event_id`,
            [
                eventData.name,
                eventData.description,
                eventData.type,
                eventData.commitment,
                eventData.location,
                eventData.skills,
                isRange,
                isRange ? null : eventData.date,
                isRange ? eventData.startDate : null,
                isRange ? eventData.endDate : null,
                Number(eventData.volunteersNeeded) || 0,
                0, // volunteers_signed starts at 0
                eventData.imagePath || null,
                organiserId
            ]
        );

        const eventId = eventInsert.rows[0].event_id;

        // 3. Insert documents if any
        if (eventData.documentPaths && eventData.documentPaths.length > 0) {
            for (const doc of eventData.documentPaths) {
                await client.query(
                    `INSERT INTO event_documents (event_id, filename, path, uploaded_at) 
                     VALUES ($1, $2, $3, NOW())`,
                    [eventId, doc.filename, doc.path]
                );
            }
        }

        await client.query('COMMIT');
        return { success: true, eventId };
    } catch (err) {
        await client.query('ROLLBACK');
        console.error("=== ERROR in createEvent ===");
        console.error("Error:", err);
        return { success: false, message: `Failed to create event: ${err.message}` };
    } finally {
        client.release();
    }
}

module.exports = { 
    getEvents, 
    getEventById,
    createEvent
};