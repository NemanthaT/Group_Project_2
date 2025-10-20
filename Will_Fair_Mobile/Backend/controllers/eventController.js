// Event Controller for Mobile Backend
const eventModel = require('../models/eventModel');

// Helper to format a date value into YYYY-MM-DD (safe)
const formatDate = (d) => {
    if (!d) return '';
    try {
        const dt = new Date(d);
        if (Number.isNaN(dt.getTime())) return String(d);
        return dt.toISOString().split('T')[0];
    } catch (e) { 
        void e; 
        return String(d); 
    }
};

// Controller to get all events and return them in a frontend-friendly shape
const getEventsController = async (req, res) => {
    try {
        const result = await eventModel.getEvents();
        if (!result.success) {
            return res.status(400).json({ success: false, error: result.message });
        }

        // Build absolute base for image URLs from request
        const host = `${req.protocol}://${req.get('host')}`;

        const mapped = (result.events || []).map(ev => {
            const imagePath = ev.image_path || ev.image || '';
            const image = imagePath
                ? (String(imagePath).startsWith('http') ? String(imagePath) : `${host}/${String(imagePath).replace(/^\/+/, '')}`)
                : '';

            const isRange = ev.is_range === true || ev.is_range === 't' || ev.is_range === 1;
            const date = isRange
                ? (formatDate(ev.start_date) || '') + (ev.end_date ? ` to ${formatDate(ev.end_date)}` : '')
                : (formatDate(ev.date) || formatDate(ev.start_date) || '');

            return {
                id: ev.event_id || ev.id,
                title: ev.name || ev.title || '',
                description: ev.description || '',
                type: ev.type || '',
                commitment: ev.commitment || '',
                location: ev.location || '',
                skills: ev.skills || '',
                volunteersNeeded: Number(ev.volunteers_needed) || 0,
                volunteersSigned: Number(ev.volunteers_signed) || 0,
                image,
                date,
                organiser: ev.organiser || null,
                documents: ev.documents || [],
                raw: ev // include raw row for any future needs
            };
        });

        return res.status(200).json({ success: true, events: mapped });
    } catch (err) {
        console.error('Server error while fetching events:', err);
        return res.status(500).json({ success: false, error: 'Server error while fetching events' });
    }
};

// Controller to get a single event by ID
const getEventByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await eventModel.getEventById(id);
        
        if (!result.success) {
            return res.status(404).json({ success: false, error: result.message });
        }

        // Build absolute base for image URLs from request
        const host = `${req.protocol}://${req.get('host')}`;
        const ev = result.event;

        const imagePath = ev.image_path || ev.image || '';
        const image = imagePath
            ? (String(imagePath).startsWith('http') ? String(imagePath) : `${host}/${String(imagePath).replace(/^\/+/, '')}`)
            : '';

        const isRange = ev.is_range === true || ev.is_range === 't' || ev.is_range === 1;
        const date = isRange
            ? (formatDate(ev.start_date) || '') + (ev.end_date ? ` to ${formatDate(ev.end_date)}` : '')
            : (formatDate(ev.date) || formatDate(ev.start_date) || '');

        const mapped = {
            id: ev.event_id || ev.id,
            title: ev.name || ev.title || '',
            description: ev.description || '',
            type: ev.type || '',
            commitment: ev.commitment || '',
            location: ev.location || '',
            skills: ev.skills || '',
            volunteersNeeded: Number(ev.volunteers_needed) || 0,
            volunteersSigned: Number(ev.volunteers_signed) || 0,
            image,
            date,
            organiser: ev.organiser || null,
            documents: ev.documents || [],
            raw: ev
        };

        return res.status(200).json({ success: true, event: mapped });
    } catch (err) {
        console.error('Server error while fetching event:', err);
        return res.status(500).json({ success: false, error: 'Server error while fetching event' });
    }
};

module.exports = {
    getEventsController,
    getEventByIdController
};