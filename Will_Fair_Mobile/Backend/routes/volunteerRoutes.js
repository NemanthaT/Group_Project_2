// Volunteer Routes for Mobile Backend
const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');

// Public Routes

// Create a new volunteer signup
router.post('/volunteers', volunteerController.createVolunteerSignup);

// Get all volunteers for a specific event
router.get('/volunteers/event/:eventId', volunteerController.getVolunteersByEvent);

// Get a specific volunteer signup by ID
router.get('/volunteers/:id', volunteerController.getVolunteerById);

// Cancel/Delete volunteer signup
router.delete('/volunteers/:id', volunteerController.cancelVolunteerSignup);

module.exports = router;