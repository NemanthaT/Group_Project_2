// Quick debug script to check event 77
const pool = require('./config/db');
const fs = require('fs');
const path = require('path');

async function debugEvent() {
    try {
        // Check database
        const result = await pool.query(
            'SELECT event_id, name, image_path FROM events WHERE event_id = 77'
        );
        
        console.log('=== EVENT 77 IN DATABASE ===');
        if (result.rows.length > 0) {
            console.log('Event found:', result.rows[0]);
            console.log('Image path in DB:', result.rows[0].image_path);
            
            // Check if file exists
            if (result.rows[0].image_path) {
                const fullPath = path.join(__dirname, result.rows[0].image_path);
                console.log('\nChecking file at:', fullPath);
                if (fs.existsSync(fullPath)) {
                    console.log('✅ File EXISTS');
                    const stats = fs.statSync(fullPath);
                    console.log('File size:', stats.size, 'bytes');
                } else {
                    console.log('❌ File NOT FOUND');
                    
                    // List what files exist in uploads/events/
                    const eventsDir = path.join(__dirname, 'uploads', 'events');
                    console.log('\nFiles in uploads/events/:');
                    if (fs.existsSync(eventsDir)) {
                        const files = fs.readdirSync(eventsDir);
                        files.forEach(file => {
                            const filePath = path.join(eventsDir, file);
                            const stats = fs.statSync(filePath);
                            if (stats.isFile()) {
                                console.log(`  - ${file} (${stats.size} bytes)`);
                            } else if (stats.isDirectory()) {
                                console.log(`  - ${file}/ (directory)`);
                            }
                        });
                    } else {
                        console.log('  Directory does not exist!');
                    }
                }
            }
        } else {
            console.log('Event 77 not found in database');
        }
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

debugEvent();
