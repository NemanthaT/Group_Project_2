# Volunteer Events Backend Implementation - Mobile App

## Summary
Implemented a complete backend for fetching volunteer event data in the mobile application, mirroring the functionality from the web application.

## Files Created

### 1. Backend Model (`Will_Fair_Mobile/Backend/models/eventModel.js`)
- **Purpose**: Handles database queries for event data
- **Functions**:
  - `getEvents()`: Fetches all volunteer events with organizer info and documents
  - `getEventById(eventId)`: Fetches a single event by its ID
- **Database Query**: Joins `volunteer_events`, `volunteer_organisers`, and `event_documents` tables

### 2. Backend Controller (`Will_Fair_Mobile/Backend/controllers/eventController.js`)
- **Purpose**: Processes requests and formats responses for the frontend
- **Functions**:
  - `getEventsController()`: Returns all events in frontend-friendly format
  - `getEventByIdController()`: Returns a single event by ID
- **Features**:
  - Formats dates properly (handles single dates and date ranges)
  - Builds absolute URLs for images
  - Maps database fields to frontend-friendly property names
  - Includes error handling

### 3. Backend Routes (`Will_Fair_Mobile/Backend/routes/eventRoutes.js`)
- **Purpose**: Defines API endpoints for event operations
- **Endpoints**:
  - `GET /api/events` - Get all events
  - `GET /api/events/:id` - Get a single event by ID

### 4. Server Configuration Updates (`Will_Fair_Mobile/Backend/server.js`)
- Added event routes to the Express app
- Updated server startup logs to display event endpoints

### 5. Frontend Updates (`Will_Fair_Mobile/Frontend/app/(drawer)/events/events.jsx`)
- Updated to fetch from mobile backend API (`http://localhost:5000/api/events`)
- Added API configuration constant for easy URL management
- Fixed component structure (added missing `export default function EventsScreen()`)
- Maintained all filtering and sorting functionality

## Data Flow

```
Mobile Frontend (React Native)
    ↓ (axios.get)
Mobile Backend API (/api/events)
    ↓
Event Controller (formats data)
    ↓
Event Model (queries database)
    ↓
PostgreSQL Database (volunteer_events table)
```

## API Response Format

The backend returns events in the following format:

```json
{
  "success": true,
  "events": [
    {
      "id": 1,
      "title": "Event Name",
      "description": "Event description",
      "type": "environment",
      "commitment": "one-time",
      "location": "Colombo",
      "skills": "none",
      "volunteersNeeded": 50,
      "volunteersSigned": 32,
      "image": "http://localhost:5000/uploads/events/1/image.jpg",
      "date": "2023-08-15",
      "organiser": {
        "organiser_id": 1,
        "name": "Organizer Name",
        "email": "organizer@example.com",
        "phone": "0771234567"
      },
      "documents": []
    }
  ]
}
```

## Database Schema Expected

The implementation expects the following tables:

1. **volunteer_events** - Main events table with columns:
   - event_id, name, description, type, commitment, location, skills
   - is_range, date, start_date, end_date
   - volunteers_needed, volunteers_signed
   - image_path, organiser_id

2. **volunteer_organisers** - Organizer information:
   - organiser_id, name, email, phone

3. **event_documents** - Attached documents:
   - document_id, event_id, filename, path

## Configuration Notes

- **Backend Port**: 5000 (configurable via .env)
- **API Base URL**: `http://localhost:5000/api`
- **For Android Emulator**: Change to `http://10.0.2.2:5000/api`
- **For Physical Device**: Use your computer's local IP address

## Next Steps

To fully utilize this implementation:

1. **Start the mobile backend server**:
   ```bash
   cd Will_Fair_Mobile/Backend
   npm install
   npm start
   ```

2. **Update API_BASE_URL in the frontend** if testing on:
   - Android Emulator: `http://10.0.2.2:5000/api`
   - iOS Simulator: `http://localhost:5000/api`
   - Physical Device: `http://<YOUR_IP>:5000/api`

3. **Ensure database tables exist** with the expected schema

4. **Test the endpoints**:
   - `GET http://localhost:5000/api/events`
   - `GET http://localhost:5000/api/events/1`

## Additional Features to Consider

- Add authentication middleware for protected routes
- Implement event creation/update endpoints
- Add volunteer sign-up functionality
- Implement image upload for events
- Add pagination for better performance with many events
- Add search functionality
- Implement caching for frequently accessed data
