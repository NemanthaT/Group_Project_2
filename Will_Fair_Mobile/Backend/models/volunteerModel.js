// Volunteer Model for Mobile Backend
const pool = require('../config/db');

// Create a new volunteer signup
async function createVolunteerSignup(volunteerData) {
    try {
        const { event_id, volunteer_name, volunteer_email, volunteer_phone, notes } = volunteerData;

        // Check if event exists and has available slots
        const eventCheck = await pool.query(
            'SELECT event_id, name, volunteers_needed, volunteers_signed FROM events WHERE event_id = $1',
            [event_id]
        );

        if (eventCheck.rows.length === 0) {
            return { success: false, message: 'Event not found' };
        }

        const event = eventCheck.rows[0];

        // Check if event is full
        if (event.volunteers_signed >= event.volunteers_needed) {
            return { success: false, message: 'This event is already full. No more volunteers can sign up.' };
        }

        // Check if volunteer already signed up for this event (prevent duplicates)
        const duplicateCheck = await pool.query(
            'SELECT volunteer_id FROM event_volunteers WHERE event_id = $1 AND volunteer_email = $2',
            [event_id, volunteer_email.toLowerCase()]
        );

        if (duplicateCheck.rows.length > 0) {
            return { success: false, message: 'You have already signed up for this event' };
        }

        // Begin transaction
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // Insert volunteer signup
            const insertResult = await client.query(
                `INSERT INTO event_volunteers 
                (event_id, volunteer_name, volunteer_email, volunteer_phone, notes, signed_up_date, created_at, updated_at) 
                VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), NOW()) 
                RETURNING volunteer_id, volunteer_name, volunteer_email, signed_up_date`,
                [event_id, volunteer_name, volunteer_email.toLowerCase(), volunteer_phone, notes || null]
            );

            // Update volunteers_signed count in events table
            await client.query(
                'UPDATE events SET volunteers_signed = volunteers_signed + 1, updated_at = NOW() WHERE event_id = $1',
                [event_id]
            );

            await client.query('COMMIT');

            return {
                success: true,
                message: 'Successfully signed up as volunteer',
                volunteer: insertResult.rows[0]
            };
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('=== ERROR in createVolunteerSignup ===');
        console.error('Error:', err);
        return { success: false, message: `Failed to sign up: ${err.message}` };
    }
}

// Get all volunteers for a specific event
async function getVolunteersByEvent(eventId) {
    try {
        const result = await pool.query(
            `SELECT 
                volunteer_id,
                volunteer_name,
                volunteer_email,
                volunteer_phone,
                signed_up_date,
                notes
            FROM event_volunteers
            WHERE event_id = $1
            ORDER BY signed_up_date DESC`,
            [eventId]
        );

        return {
            success: true,
            volunteers: result.rows
        };
    } catch (err) {
        console.error('=== ERROR in getVolunteersByEvent ===');
        console.error('Error:', err);
        return { success: false, message: `Failed to get volunteers: ${err.message}` };
    }
}

// Get volunteer signup by ID
async function getVolunteerById(volunteerId) {
    try {
        const result = await pool.query(
            `SELECT 
                v.volunteer_id,
                v.volunteer_name,
                v.volunteer_email,
                v.volunteer_phone,
                v.signed_up_date,
                v.notes,
                e.event_id,
                e.name as event_name
            FROM event_volunteers v
            JOIN events e ON v.event_id = e.event_id
            WHERE v.volunteer_id = $1`,
            [volunteerId]
        );

        if (result.rows.length === 0) {
            return { success: false, message: 'Volunteer signup not found' };
        }

        return {
            success: true,
            volunteer: result.rows[0]
        };
    } catch (err) {
        console.error('=== ERROR in getVolunteerById ===');
        console.error('Error:', err);
        return { success: false, message: `Failed to get volunteer: ${err.message}` };
    }
}

// Cancel/Delete volunteer signup
async function cancelVolunteerSignup(volunteerId) {
    try {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // Get volunteer info before deleting
            const volunteerResult = await client.query(
                'SELECT event_id FROM event_volunteers WHERE volunteer_id = $1',
                [volunteerId]
            );

            if (volunteerResult.rows.length === 0) {
                await client.query('ROLLBACK');
                return { success: false, message: 'Volunteer signup not found' };
            }

            const eventId = volunteerResult.rows[0].event_id;

            // Delete volunteer signup
            await client.query(
                'DELETE FROM event_volunteers WHERE volunteer_id = $1',
                [volunteerId]
            );

            // Decrement volunteers_signed count
            await client.query(
                'UPDATE events SET volunteers_signed = GREATEST(volunteers_signed - 1, 0), updated_at = NOW() WHERE event_id = $1',
                [eventId]
            );

            await client.query('COMMIT');

            return {
                success: true,
                message: 'Volunteer signup cancelled successfully'
            };
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('=== ERROR in cancelVolunteerSignup ===');
        console.error('Error:', err);
        return { success: false, message: `Failed to cancel signup: ${err.message}` };
    }
}

module.exports = {
    createVolunteerSignup,
    getVolunteersByEvent,
    getVolunteerById,
    cancelVolunteerSignup
};
