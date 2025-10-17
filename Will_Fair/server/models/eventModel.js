//import fs from "fs";
//import path from "path";
import pool from "../db.js";

//Get all events from the database
async function getEvents() {
    try {
        const result = await pool.query('SELECT * FROM events');
        return { success: true, events: result.rows };
    } catch (err) {
        console.error("Error in getEvents:", err);
        return { success: false, message: "Database query error" };
    }
}

export { getEvents };