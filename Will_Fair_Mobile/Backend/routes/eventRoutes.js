// Event Routes for Mobile Backend
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Public Routes
// Get all events
router.get('/events', eventController.getEventsController);

// Get a single event by ID
router.get('/events/:id', eventController.getEventByIdController);

module.exports = router;
