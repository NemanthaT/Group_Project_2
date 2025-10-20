// Event Routes for Mobile Backend
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { uploadEvent } = require('../middleware/upload');

// Public Routes
// Get all events
router.get('/events', eventController.getEventsController);

// Get a single event by ID
router.get('/events/:id', eventController.getEventByIdController);

// Create a new event with image and documents
router.post('/events', (req, res, next) => {
  console.log('=== POST /events REQUEST ===');
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Body keys:', Object.keys(req.body));
  next();
}, uploadEvent, (err, req, res, next) => {
  // Multer error handler
  if (err) {
    console.error('=== MULTER ERROR ===');
    console.error('Error:', err.message);
    console.error('Code:', err.code);
    return res.status(400).json({
      success: false,
      error: 'File upload error: ' + err.message
    });
  }
  next();
}, eventController.createEventController);

module.exports = router;