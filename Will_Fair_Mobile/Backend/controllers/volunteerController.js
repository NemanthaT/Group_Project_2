// Volunteer Controller for Mobile Backend
const volunteerModel = require('../models/volunteerModel');

// Create a new volunteer signup
const createVolunteerSignup = async (req, res) => {
    try {
        console.log('=== CREATE VOLUNTEER SIGNUP ===');
        console.log('Request body:', req.body);

        const { event_id, volunteer_name, volunteer_email, volunteer_phone, notes } = req.body;

        // Validate required fields
        if (!event_id || !volunteer_name || !volunteer_email || !volunteer_phone) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: event_id, volunteer_name, volunteer_email, volunteer_phone'
            });
        }

        // Validate email format
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(volunteer_email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email format'
            });
        }

        // Call model to create signup
        const result = await volunteerModel.createVolunteerSignup({
            event_id,
            volunteer_name,
            volunteer_email,
            volunteer_phone,
            notes
        });

        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: result.message
            });
        }

        return res.status(201).json({
            success: true,
            message: result.message,
            volunteer: result.volunteer
        });
    } catch (err) {
        console.error('Error in createVolunteerSignup:', err);
        return res.status(500).json({
            success: false,
            error: 'Server error while creating volunteer signup: ' + err.message
        });
    }
};

// Get all volunteers for a specific event
const getVolunteersByEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        if (!eventId) {
            return res.status(400).json({
                success: false,
                error: 'Event ID is required'
            });
        }

        const result = await volunteerModel.getVolunteersByEvent(eventId);

        if (!result.success) {
            return res.status(500).json({
                success: false,
                error: result.message
            });
        }

        return res.status(200).json({
            success: true,
            volunteers: result.volunteers,
            count: result.volunteers.length
        });
    } catch (err) {
        console.error('Error in getVolunteersByEvent:', err);
        return res.status(500).json({
            success: false,
            error: 'Server error while fetching volunteers: ' + err.message
        });
    }
};

// Get volunteer signup by ID
const getVolunteerById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                error: 'Volunteer ID is required'
            });
        }

        const result = await volunteerModel.getVolunteerById(id);

        if (!result.success) {
            return res.status(404).json({
                success: false,
                error: result.message
            });
        }

        return res.status(200).json({
            success: true,
            volunteer: result.volunteer
        });
    } catch (err) {
        console.error('Error in getVolunteerById:', err);
        return res.status(500).json({
            success: false,
            error: 'Server error while fetching volunteer: ' + err.message
        });
    }
};

// Cancel volunteer signup
const cancelVolunteerSignup = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                error: 'Volunteer ID is required'
            });
        }

        const result = await volunteerModel.cancelVolunteerSignup(id);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: result.message
            });
        }

        return res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (err) {
        console.error('Error in cancelVolunteerSignup:', err);
        return res.status(500).json({
            success: false,
            error: 'Server error while cancelling signup: ' + err.message
        });
    }
};

module.exports = {
    createVolunteerSignup,
    getVolunteersByEvent,
    getVolunteerById,
    cancelVolunteerSignup
};
