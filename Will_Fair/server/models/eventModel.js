//import fs from "fs";
//import path from "path";
import pool from "../db.js";

//Get all events with organiser info and attached documents
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
        WHERE e.is_approved = true
        ORDER BY e.start_date DESC NULLS LAST, e.date DESC NULLS LAST
        `;

        const result = await pool.query(sql);
        return { success: true, events: result.rows };
    } catch (err) {
        console.error("Error in getEvents:", err);
        return { success: false, message: "Database query error" };
    }
}

// Add a new organiser to the database
async function addOrganiser(organiserData) {
    try {
        const sql = `
            INSERT INTO volunteer_organisers (name, email, phone)
            VALUES ($1, $2, $3)
            RETURNING organiser_id
        `;
        
        const result = await pool.query(sql, [
            organiserData.name,
            organiserData.email,
            organiserData.phone
        ]);
        
        const organiserId = result.rows[0].organiser_id;
        return { success: true, organiserId };
    } catch (err) {
        console.error("Database error during addOrganiser():", err);
        return { success: false, message: "Database error" };
    }
}

// Add a new event to the database
async function addEvent(eventData) {
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
                location,
                type,
                commitment,
                skills,
                image_path,
                is_approved
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            RETURNING event_id
        `;
        
        const result = await pool.query(sql, [
            eventData.organiserId,
            eventData.name,
            eventData.isRange || false,
            eventData.date || null,
            eventData.startDate || null,
            eventData.endDate || null,
            eventData.description,
            eventData.volunteersNeeded || 1,
            eventData.location,
            eventData.type,
            eventData.commitment,
            eventData.skills,
            eventData.imagePath || null,
            false
        ]);
        
        const eventId = result.rows[0].event_id;
        return { success: true, eventId };
    } catch (err) {
        console.error("Database error during addEvent():", err);
        return { success: false, message: "Database error" };
    }
}

// Add documents for an event
async function addDocuments(eventId, documents) {
    try {
        // documents should be an array of objects with { filename, path }
        if (!Array.isArray(documents) || documents.length === 0) {
            return { success: true, message: "No documents to add" };
        }
        
        const sql = `
            INSERT INTO event_documents (event_id, filename, path)
            VALUES ($1, $2, $3)
        `;
        
        for (const doc of documents) {
            await pool.query(sql, [eventId, doc.filename, doc.path]);
        }
        
        return { success: true, message: `${documents.length} document(s) added successfully` };
    } catch (err) {
        console.error("Database error during addDocuments():", err);
        return { success: false, message: "Database error" };
    }
}

// Update event image path after file has been moved
async function updateEventImage(eventId, imagePath) {
    try {
        const sql = `UPDATE volunteer_events SET image_path = $1 WHERE event_id = $2`;
        await pool.query(sql, [imagePath, eventId]);
        return { success: true };
    } catch (err) {
        console.error("Database error during updateEventImage():", err);
        return { success: false, message: "Database error" };
    }
}

export { getEvents, addOrganiser, addEvent, addDocuments, updateEventImage };