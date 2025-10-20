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

// Controller to create a new event
const createEventController = async (req, res) => {
    try {
        console.log('=== CREATE EVENT REQUEST ===');
        console.log('Body:', req.body);
        console.log('Files:', req.files);
        console.log('Content-Type:', req.headers['content-type']);
        
        // Log detailed file information
        if (req.files) {
            if (req.files.image) {
                console.log('Image file details:', {
                    fieldname: req.files.image[0].fieldname,
                    originalname: req.files.image[0].originalname,
                    filename: req.files.image[0].filename,
                    path: req.files.image[0].path,
                    size: req.files.image[0].size
                });
            }
            if (req.files.documents) {
                console.log('Document files count:', req.files.documents.length);
                req.files.documents.forEach((doc, idx) => {
                    console.log(`Document ${idx + 1}:`, {
                        originalname: doc.originalname,
                        filename: doc.filename,
                        path: doc.path,
                        size: doc.size
                    });
                });
            }
        }

        // Extract form data
        const {
            name, description, type, commitment, location, skills,
            isRange, date, startDate, endDate,
            volunteersNeeded,
            contactName, contactEmail, contactNumber
        } = req.body;

        // Validate required fields
        if (!name || !description || !type || !commitment || !location || !skills) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required fields: name, description, type, commitment, location, skills' 
            });
        }

        if (!contactName || !contactEmail || !contactNumber) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing contact information' 
            });
        }

        // Validate date fields
        const isRangeEvent = isRange === true || isRange === 'true';
        if (!isRangeEvent && !date) {
            return res.status(400).json({ 
                success: false, 
                error: 'Date is required for non-range events' 
            });
        }
        if (isRangeEvent && (!startDate || !endDate)) {
            return res.status(400).json({ 
                success: false, 
                error: 'Start date and end date are required for range events' 
            });
        }

        // Get uploaded files
        const imageFile = req.files && req.files.image ? req.files.image[0] : null;
        const documentFiles = req.files && req.files.documents ? req.files.documents : [];

        if (!imageFile) {
            return res.status(400).json({ 
                success: false, 
                error: 'Event image is required' 
            });
        }

        if (documentFiles.length === 0) {
            return res.status(400).json({ 
                success: false, 
                error: 'At least one PDF document is required' 
            });
        }

        // Build image path (relative to server root)
        const imagePath = imageFile.path.replace(/\\/g, '/');

        // Build document paths
        const documentPaths = documentFiles.map(doc => ({
            filename: doc.originalname,
            path: doc.path.replace(/\\/g, '/')
        }));

        // Prepare event data
        const eventData = {
            name,
            description,
            type,
            commitment,
            location,
            skills,
            isRange: isRangeEvent,
            date: isRangeEvent ? null : date,
            startDate: isRangeEvent ? startDate : null,
            endDate: isRangeEvent ? endDate : null,
            volunteersNeeded: Number(volunteersNeeded) || 0,
            imagePath,
            documentPaths,
            contactName,
            contactEmail,
            contactNumber
        };

        console.log('Event data prepared:', eventData);

        // Call model to create event
        const result = await eventModel.createEvent(eventData);

        if (!result.success) {
            return res.status(500).json({ 
                success: false, 
                error: result.message 
            });
        }

        return res.status(201).json({ 
            success: true, 
            message: 'Event created successfully',
            eventId: result.eventId
        });
    } catch (err) {
        console.error('Server error while creating event:', err);
        return res.status(500).json({ 
            success: false, 
            error: 'Server error while creating event: ' + err.message 
        });
    }
};

module.exports = {
    getEventsController,
    getEventByIdController,
    createEventController
};