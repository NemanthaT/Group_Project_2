// Test volunteer signup and verify count increment
const pool = require('./config/db');

async function testVolunteerSignup() {
    try {
        console.log('=== VOLUNTEER SIGNUP INCREMENT TEST ===\n');

        // Get an event to test with
        const eventsResult = await pool.query(
            'SELECT event_id, name, volunteers_needed, volunteers_signed FROM events LIMIT 1'
        );

        if (eventsResult.rows.length === 0) {
            console.log('❌ No events found in database. Please create an event first.');
            process.exit(1);
        }

        const event = eventsResult.rows[0];
        console.log('📅 Testing with Event:');
        console.log(`   ID: ${event.event_id}`);
        console.log(`   Name: ${event.name}`);
        console.log(`   Needed: ${event.volunteers_needed}`);
        console.log(`   Currently Signed: ${event.volunteers_signed}\n`);

        // Check current count
        const beforeCount = event.volunteers_signed;

        // Simulate a volunteer signup
        const testEmail = `test_volunteer_${Date.now()}@example.com`;
        console.log('🙋 Creating test volunteer signup...');
        console.log(`   Email: ${testEmail}\n`);

        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // Insert volunteer
            const insertResult = await client.query(
                `INSERT INTO event_volunteers 
                (event_id, volunteer_name, volunteer_email, volunteer_phone, notes, signed_up_date, created_at, updated_at) 
                VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), NOW()) 
                RETURNING volunteer_id`,
                [event.event_id, 'Test Volunteer', testEmail, '0771234567', 'Test signup']
            );

            const volunteerId = insertResult.rows[0].volunteer_id;
            console.log(`✅ Volunteer created with ID: ${volunteerId}`);

            // Increment count
            await client.query(
                'UPDATE events SET volunteers_signed = volunteers_signed + 1, updated_at = NOW() WHERE event_id = $1',
                [event.event_id]
            );

            console.log('✅ Events table updated (volunteers_signed + 1)');

            await client.query('COMMIT');
            console.log('✅ Transaction committed\n');

            // Verify the count increased
            const afterResult = await pool.query(
                'SELECT volunteers_signed FROM events WHERE event_id = $1',
                [event.event_id]
            );

            const afterCount = afterResult.rows[0].volunteers_signed;

            console.log('📊 VERIFICATION:');
            console.log(`   Before: ${beforeCount}`);
            console.log(`   After:  ${afterCount}`);
            console.log(`   Difference: +${afterCount - beforeCount}\n`);

            if (afterCount === beforeCount + 1) {
                console.log('✅ SUCCESS! volunteers_signed incremented correctly!');
            } else {
                console.log('❌ ERROR! Count did not increment as expected.');
            }

            // Cleanup - delete test volunteer
            console.log('\n🧹 Cleaning up test data...');
            await client.query('DELETE FROM event_volunteers WHERE volunteer_id = $1', [volunteerId]);
            await client.query(
                'UPDATE events SET volunteers_signed = volunteers_signed - 1 WHERE event_id = $1',
                [event.event_id]
            );
            console.log('✅ Test data cleaned up');

        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Test failed:', error);
        process.exit(1);
    }
}

testVolunteerSignup();
