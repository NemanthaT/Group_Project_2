import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import pool from "../db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Retrieves all approved events with organiser info and documents
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
            e.request_deletion,
            json_build_object(
                'organiser_id', o.organiser_id,
                'name', o.name,
                'email', o.email,
                'phone', o.phone
            ) AS organiser,
            COALESCE(d.docs, '[]'::json) AS documents
        FROM events e
        LEFT JOIN event_organisers o ON o.organiser_id = e.organiser_id
        LEFT JOIN (
            SELECT event_id, json_agg(json_build_object('document_id', document_id, 'filename', filename, 'path', path)) AS docs
            FROM event_documents
            GROUP BY event_id
        ) d ON d.event_id = e.event_id
        WHERE e.is_approved = true 
            AND e.request_deletion = false
            AND e.volunteers_needed > e.volunteers_signed
            AND COALESCE(e.start_date, e.date) > CURRENT_DATE
        ORDER BY COALESCE(e.start_date, e.date) ASC NULLS LAST
        `;

        const result = await pool.query(sql);
        return { success: true, events: result.rows };
    } catch (err) {
        console.error("Error in getEvents:", err);
        return { success: false, message: "Database query error" };
    }
}

// Retrieves a single event by ID with organiser information
async function getEventById(eventId) {
    try{
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
        ) AS organiser
      FROM events e
      LEFT JOIN event_organisers o ON o.organiser_id = e.organiser_id
      WHERE e.event_id = $1
    `;
    const result = await pool.query(sql, [eventId]);
    if (result.rows.length === 0) return { success: false, message: "Event not found" };
    return { success: true, event: result.rows[0] };
    } catch (err) {
    console.error("Error in getEventById:", err);
    return { success: false, message: "Database query error" };
    }
}

// Retrieves all events pending approval with organiser info and documents
async function getPendingEvents() {
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
            e.request_deletion,
            json_build_object(
                'organiser_id', o.organiser_id,
                'name', o.name,
                'email', o.email,
                'phone', o.phone
            ) AS organiser,
            COALESCE(d.docs, '[]'::json) AS documents
        FROM events e
        LEFT JOIN event_organisers o ON o.organiser_id = e.organiser_id
        LEFT JOIN (
            SELECT event_id, json_agg(json_build_object('document_id', document_id, 'filename', filename, 'path', path)) AS docs
            FROM event_documents
            GROUP BY event_id
        ) d ON d.event_id = e.event_id
        WHERE e.is_approved = false 
            AND e.request_deletion = false
            AND COALESCE(e.start_date, e.date) > CURRENT_DATE
        ORDER BY COALESCE(e.start_date, e.date) ASC NULLS LAST
        `;

        const result = await pool.query(sql);
        return { success: true, events: result.rows };
    } catch (err) {
        console.error("Error in getPendingEvents:", err);
        return { success: false, message: "Database query error" };
    }
}

// Retrieves all events marked for deletion with organiser info and documents
async function getPendingDeletionEvents() {
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
            e.request_deletion,
            json_build_object(
                'organiser_id', o.organiser_id,
                'name', o.name,
                'email', o.email,
                'phone', o.phone
            ) AS organiser,
            COALESCE(d.docs, '[]'::json) AS documents
        FROM events e
        LEFT JOIN event_organisers o ON o.organiser_id = e.organiser_id
        LEFT JOIN (
            SELECT event_id, json_agg(json_build_object('document_id', document_id, 'filename', filename, 'path', path)) AS docs
            FROM event_documents
            GROUP BY event_id
        ) d ON d.event_id = e.event_id
        WHERE e.request_deletion = true
            AND COALESCE(e.start_date, e.date) > CURRENT_DATE
        ORDER BY COALESCE(e.start_date, e.date) ASC NULLS LAST
        `;

        const result = await pool.query(sql);
        return { success: true, events: result.rows };
    } catch (err) {
        console.error("Error in getPendingEvents:", err);
        return { success: false, message: "Database query error" };
    }
}

// Adds a new organiser or updates existing one if email already exists
async function addOrganiser(organiserData) {
    try {
        const checkSql = `
            SELECT organiser_id FROM event_organisers 
            WHERE email = $1
        `;
        
        const existingOrganiser = await pool.query(checkSql, [organiserData.email]);
        
        if (existingOrganiser.rows.length > 0) {
            const organiserId = existingOrganiser.rows[0].organiser_id;
            
            const updateSql = `
                UPDATE event_organisers 
                SET name = $1, phone = $2, updated_at = NOW()
                WHERE organiser_id = $3
            `;
            await pool.query(updateSql, [organiserData.name, organiserData.phone, organiserId]);
            
            return { success: true, organiserId, existing: true };
        }
        
        const insertSql = `
            INSERT INTO event_organisers (name, email, phone)
            VALUES ($1, $2, $3)
            RETURNING organiser_id
        `;
        
        const result = await pool.query(insertSql, [
            organiserData.name,
            organiserData.email,
            organiserData.phone
        ]);
        
        const organiserId = result.rows[0].organiser_id;
        return { success: true, organiserId, existing: false };
    } catch (err) {
        console.error("Database error during addOrganiser():", err);
        return { success: false, message: "Database error" };
    }
}

// Creates a new event in the database with all provided details
async function addEvent(eventData) {
    try {
        const eventKey = generateEventKey();

        const sql = `
            INSERT INTO events (
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
                is_approved,
                request_deletion,
                event_key
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            RETURNING event_id, event_key
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
            false,
            false,
            eventKey 
        ]);
        
        const eventId = result.rows[0].event_id;
        const returnedEventKey = result.rows[0].event_key;
        
        return { 
            success: true, 
            eventId,
            eventKey: returnedEventKey 
        };
    } catch (err) {
        console.error("Database error during addEvent():", err);
        return { success: false, message: "Database error" };
    }
}


// Adds document records to the database for a specific event
async function addDocuments(eventId, documents) {
    try {
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

// Updates the image path for an event after file upload
async function updateEventImage(eventId, imagePath) {
    try {
        const sql = `UPDATE events SET image_path = $1 WHERE event_id = $2`;
        await pool.query(sql, [imagePath, eventId]);
        return { success: true };
    } catch (err) {
        console.error("Database error during updateEventImage():", err);
        return { success: false, message: "Database error" };
    }
}

// Approves an event by setting is_approved to true
async function approveEvent(eventId) {
    try {
        const sql = `
            UPDATE events 
            SET is_approved = true, updated_at = NOW()
            WHERE event_id = $1
            RETURNING event_id
        `;
        
        const result = await pool.query(sql, [eventId]);
        
        if (result.rows.length === 0) {
            return { success: false, message: "Event not found" };
        }
        
        return { success: true, eventId: result.rows[0].event_id };
    } catch (err) {
        console.error("Database error during approveEvent():", err);
        return { success: false, message: "Database error" };
    }
}

// Rejects an event by deleting it from the database
async function rejectEvent(eventId) {
    try {
        const sql = `
            DELETE FROM events 
            WHERE event_id = $1 AND is_approved = false
            RETURNING event_id
        `;
        
        const result = await pool.query(sql, [eventId]);
        
        if (result.rows.length === 0) {
            return { success: false, message: "Event not found or already approved" };
        }

        const eventFolder = path.join(__dirname, '..', 'uploads', 'events', eventId.toString());
        
        if (fs.existsSync(eventFolder)) {
            fs.rmSync(eventFolder, { recursive: true, force: true });
            console.log(`✅ Deleted event folder: ${eventFolder}`);
        }
        
        return { success: true, eventId: result.rows[0].event_id };
    } catch (err) {
        console.error("Database error during rejectEvent():", err);
        return { success: false, message: "Database error" };
    }
}

// Deletes an event and its associated files from database and filesystem
async function deleteEvent(eventId) {
    try {
        const sql = `
            DELETE FROM events 
            WHERE event_id = $1
            RETURNING event_id
        `;
        
        const result = await pool.query(sql, [eventId]);
        
        if (result.rows.length === 0) {
            return { success: false, message: "Event not found" };
        }

        const eventFolder = path.join(__dirname, '..', 'uploads', 'events', eventId.toString());
        
        if (fs.existsSync(eventFolder)) {
            fs.rmSync(eventFolder, { recursive: true, force: true });
            console.log(`✅ Deleted event folder: ${eventFolder}`);
        } else {
            console.log(`⚠️ Event folder not found: ${eventFolder}`);
        }
        
        return { success: true, eventId: result.rows[0].event_id };
    } catch (err) {
        console.error("Database error during deleteEvent():", err);
        return { success: false, message: "Database error" };
    }
}

// Returns the count of events pending approval
async function getPendingEventsCount() {
    try {
        const sql = `
            SELECT COUNT(*) as count
            FROM events
            WHERE is_approved = false 
                AND request_deletion = false
                AND COALESCE(start_date, date) > CURRENT_DATE
        `;
        
        const result = await pool.query(sql);
        return { success: true, count: parseInt(result.rows[0].count) };
    } catch (err) {
        console.error("Error in getPendingEventsCount:", err);
        return { success: false, message: "Database query error" };
    }
}

// Returns the count of events pending deletion approval
async function getPendingDeletionEventsCount() {
    try {
        const sql = `
            SELECT COUNT(*) as count
            FROM events
            WHERE request_deletion = true
                AND COALESCE(start_date, date) > CURRENT_DATE
        `;
        
        const result = await pool.query(sql);
        return { success: true, count: parseInt(result.rows[0].count) };
    } catch (err) {
        console.error("Error in getPendingDeletionEventsCount:", err);
        return { success: false, message: "Database query error" };
    }
}

// Returns counts for pending approval and deletion events in one query
async function getEventCounts() {
    try {
        const sql = `
            SELECT 
                COUNT(*) FILTER (WHERE is_approved = false AND request_deletion = false) as pending_approval,
                COUNT(*) FILTER (WHERE request_deletion = true) as pending_deletion
            FROM events
            WHERE COALESCE(start_date, date) > CURRENT_DATE
        `;
        
        const result = await pool.query(sql);
        const counts = {
            pendingApproval: parseInt(result.rows[0].pending_approval),
            pendingDeletion: parseInt(result.rows[0].pending_deletion),
            total: parseInt(result.rows[0].pending_approval) + parseInt(result.rows[0].pending_deletion)
        };
        
        return { success: true, counts };
    } catch (err) {
        console.error("Error in getEventCounts:", err);
        return { success: false, message: "Database query error" };
    }
}

// Generates a unique volunteer key for event registration
function generateVolunteerKey() {
  const prefix = 'VOL';
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();
  return `${prefix}-${randomPart}-${timestamp}`;
}

// Withdraws a volunteer from an event using email and volunteer key
async function withdrawVolunteer(email, volunteerKey) {
  try {
    const query = `
      DELETE FROM event_volunteers 
      WHERE volunteer_email = $1 
      AND volunteer_key = $2
      RETURNING event_id, volunteer_name, volunteer_email;
    `;
    
    const result = await pool.query(query, [email, volunteerKey]);
    
    if (result.rows.length === 0) {
        return {
        success: false,
        message: 'No matching volunteer registration found. Please check your email and volunteer key.'
      };
    }

    const deletedVolunteer = result.rows[0];
    
    const updateEventQuery = `
      UPDATE events 
      SET volunteers_signed = GREATEST(volunteers_signed - 1, 0)
      WHERE event_id = $1
      RETURNING volunteers_signed;
    `;
    
    await pool.query(updateEventQuery, [deletedVolunteer.event_id]);
    
    return {
      success: true,
      message: 'Successfully withdrawn from the event',
      volunteer: deletedVolunteer
    };
    
  } catch (error) {
    console.error('Error withdrawing volunteer:', error);
    return {
      success: false,
      message: 'An error occurred while processing your withdrawal'
    };
  }
}

// Generates a unique event key for event creation
function generateEventKey() {
  const prefix = 'EVT';
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();
  return `${prefix}-${randomPart}-${timestamp}`;
}

// Submits a deletion request for an event by the organiser
async function requestEventDeletion(email, eventKey) {
  try {
    const organiserQuery = `
      SELECT organiser_id 
      FROM event_organisers 
      WHERE email = $1;
    `;
    
    const organiserResult = await pool.query(organiserQuery, [email]);
    
    if (organiserResult.rows.length === 0) {
      return {
        success: false,
        message: 'No organiser found with this email address.'
      };
    }

    const organiserId = organiserResult.rows[0].organiser_id;
    
    const updateQuery = `
      UPDATE events 
      SET request_deletion = true, 
          updated_at = NOW()
      WHERE organiser_id = $1 
      AND event_key = $2
      RETURNING event_id, name, event_key;
    `;
    
    const result = await pool.query(updateQuery, [organiserId, eventKey]);
    
    if (result.rows.length === 0) {
      return {
        success: false,
        message: 'No matching event found. Please check your email and event key.'
      };
    }

    const updatedEvent = result.rows[0];
    
    return {
      success: true,
      message: 'Event deletion request submitted successfully. An admin will review your request.',
      event: updatedEvent
    };
    
  } catch (error) {
    console.error('Error requesting event deletion:', error);
    return {
      success: false,
      message: 'An error occurred while processing your deletion request'
    };
  }
}

// Retrieves the list of volunteers for a specific event
async function getVolunteerListByEvent(email, eventKey) {
  try {
    const verifyQuery = `
      SELECT e.event_id, e.name, o.name as organiser_name
      FROM events e
      INNER JOIN event_organisers o ON e.organiser_id = o.organiser_id
      WHERE o.email = $1 AND e.event_key = $2
    `;
    
    const verifyResult = await pool.query(verifyQuery, [email, eventKey]);
    
    if (verifyResult.rows.length === 0) {
      return {
        success: false,
        message: 'Event not found or you are not the organizer of this event. Please check your email and event key.'
      };
    }
    
    const eventId = verifyResult.rows[0].event_id;
    const eventName = verifyResult.rows[0].name;
    const organiserName = verifyResult.rows[0].organiser_name;
    
    const volunteersQuery = `
      SELECT 
        volunteer_name as name,
        volunteer_email as email,
        volunteer_phone as mobile,
        signed_up_date as registered_at
      FROM event_volunteers
      WHERE event_id = $1
      ORDER BY signed_up_date DESC
    `;
    
    const volunteersResult = await pool.query(volunteersQuery, [eventId]);
    
    return {
      success: true,
      eventName: eventName,
      organiserName: organiserName,
      volunteers: volunteersResult.rows
    };
    
  } catch (error) {
    console.error('Error in getVolunteerListByEvent:', error);
    return {
      success: false,
      message: 'An error occurred while retrieving the volunteer list.'
    };
  }
}

export { 
    getEvents, 
    getEventById, 
    getPendingEvents, 
    getPendingDeletionEvents, 
    addOrganiser, 
    addEvent, 
    addDocuments, 
    updateEventImage, 
    approveEvent,
    rejectEvent,
    deleteEvent,
    getPendingEventsCount,
    getPendingDeletionEventsCount,
    getEventCounts,
    generateVolunteerKey,
    withdrawVolunteer,
    generateEventKey,        
    requestEventDeletion,
    getVolunteerListByEvent
};

