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
        ORDER BY e.start_date DESC NULLS LAST, e.date DESC NULLS LAST
        `;

        const result = await pool.query(sql);
        return { success: true, events: result.rows };
    } catch (err) {
        console.error("Error in getEvents:", err);
        return { success: false, message: "Database query error" };
    }
}

export { getEvents };