# Testing the Volunteer Events API

## Quick Start Guide

### 1. Start the Mobile Backend Server

```bash
cd Will_Fair_Mobile/Backend
npm install
npm start
```

The server should start on `http://localhost:5000`

### 2. Test the API Endpoints

#### Get All Events
```bash
# Using curl (Windows CMD)
curl http://localhost:5000/api/events

# Using PowerShell
Invoke-WebRequest -Uri http://localhost:5000/api/events -Method GET

# Or open in browser:
http://localhost:5000/api/events
```

Expected Response:
```json
{
  "success": true,
  "events": [
    {
      "id": 1,
      "title": "Beach Cleanup",
      "description": "Help clean the beach",
      "type": "environment",
      "commitment": "one-time",
      "location": "Colombo",
      "skills": "none",
      "volunteersNeeded": 50,
      "volunteersSigned": 32,
      "image": "http://localhost:5000/uploads/...",
      "date": "2023-08-15",
      "organiser": {...},
      "documents": []
    }
  ]
}
```

#### Get Single Event
```bash
curl http://localhost:5000/api/events/1
```

### 3. Update Frontend Configuration

If testing on different devices, update the API URL in:
`Will_Fair_Mobile/Frontend/app/(drawer)/events/events.jsx`

```javascript
// For localhost (iOS Simulator or Web)
const API_BASE_URL = 'http://localhost:5000/api';

// For Android Emulator
const API_BASE_URL = 'http://10.0.2.2:5000/api';

// For Physical Device (replace with your computer's IP)
const API_BASE_URL = 'http://192.168.1.XXX:5000/api';
```

### 4. Run the Mobile App

```bash
cd Will_Fair_Mobile/Frontend
npm install
npm start
# or
npx expo start
```

## Troubleshooting

### Issue: "Network Error" or "Failed to load events"

**Solutions:**
1. Ensure backend server is running on port 5000
2. Check if firewall is blocking connections
3. Verify API_BASE_URL matches your setup
4. For Android Emulator, use `10.0.2.2` instead of `localhost`
5. For physical device, use your computer's local IP

### Issue: "Database query error"

**Solutions:**
1. Check database connection in `Will_Fair_Mobile/Backend/config/db.js`
2. Verify DATABASE_URL in `.env` file
3. Ensure required tables exist in database
4. Check database credentials

### Issue: Empty events array

**Solutions:**
1. Check if `volunteer_events` table has data
2. Verify SQL query in `eventModel.js`
3. Check database logs for errors

## Database Setup

If tables don't exist, you may need to create them. The implementation expects:

### volunteer_events table
```sql
CREATE TABLE volunteer_events (
    event_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    type VARCHAR(50),
    commitment VARCHAR(50),
    location VARCHAR(100),
    skills VARCHAR(100),
    is_range BOOLEAN DEFAULT FALSE,
    date DATE,
    start_date DATE,
    end_date DATE,
    volunteers_needed INTEGER,
    volunteers_signed INTEGER DEFAULT 0,
    image_path VARCHAR(500),
    organiser_id INTEGER
);
```

### volunteer_organisers table
```sql
CREATE TABLE volunteer_organisers (
    organiser_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20)
);
```

### event_documents table
```sql
CREATE TABLE event_documents (
    document_id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES volunteer_events(event_id),
    filename VARCHAR(255),
    path VARCHAR(500)
);
```

## Testing with Sample Data

Insert some test data:

```sql
-- Insert organiser
INSERT INTO volunteer_organisers (name, email, phone) 
VALUES ('John Doe', 'john@example.com', '0771234567');

-- Insert event
INSERT INTO volunteer_events (
    name, description, type, commitment, location, skills,
    date, volunteers_needed, volunteers_signed, organiser_id
) VALUES (
    'Beach Cleanup in Mount Lavinia',
    'Help clean up Mount Lavinia beach to protect marine life',
    'environment',
    'one-time',
    'Colombo',
    'none',
    '2024-12-31',
    50,
    32,
    1
);
```

## Next Steps

- Test filtering and sorting in the mobile app
- Implement event detail view
- Add volunteer sign-up functionality
- Test image uploads for events
