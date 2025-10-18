// Event Routes for Mobile Backend
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const eventUpload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');

// Ensure upload directories exist
const tempDir = path.join(__dirname, '..', 'uploads', 'temp');
const eventsDir = path.join(__dirname, '..', 'uploads', 'events');

[tempDir, eventsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// POST create event with custom upload middleware - MUST BE BEFORE GET routes
router.post('/events', eventUpload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'documents', maxCount: 5 }
]), eventController.createEventController);

// GET routes
// Get all events
router.get('/events', eventController.getEventsController);

// Get a single event by ID
router.get('/events/:id', eventController.getEventByIdController);

module.exports = router;
