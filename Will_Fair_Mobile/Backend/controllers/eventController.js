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

        // Process documents to include full URLs
        const documents = (ev.documents || []).map(doc => ({
            ...doc,
            url: doc.path 
                ? (String(doc.path).startsWith('http') ? String(doc.path) : `${host}/${String(doc.path).replace(/^\/+/, '')}`)
                : ''
        }));

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
            eventKey: ev.event_key || '',
            organiser: ev.organiser || null,
            documents: documents,
            raw: ev
        };

        return res.status(200).json({ success: true, event: mapped });
    } catch (err) {
        console.error('Server error while fetching event:', err);
        return res.status(500).json({ success: false, error: 'Server error while fetching event' });
    }
};

// Create new event with organizer and file uploads
const createEventMobile = async (req, res) => {
    try {
        console.log('=== CREATE EVENT REQUEST RECEIVED ===');
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);
        console.log('Request headers:', req.headers);
        console.log('=====================================');

        const {
            name,
            isRange,
            date,
            startDate,
            endDate,
            description,
            volunteersNeeded,
            location,
            type,
            commitment,
            skills,
            contactName,
            contactEmail,
            contactNumber
        } = req.body;

        console.log('Create event request received:', req.body);
        console.log('Files received:', req.files);

        // Validate required fields
        if (!name) {
            return res.status(400).json({ success: false, message: 'Event name is required' });
        }
        if (!description) {
            return res.status(400).json({ success: false, message: 'Description is required' });
        }
        if (!volunteersNeeded) {
            return res.status(400).json({ success: false, message: 'Number of volunteers needed is required' });
        }
        if (!location) {
            return res.status(400).json({ success: false, message: 'Location is required' });
        }
        if (!type) {
            return res.status(400).json({ success: false, message: 'Event type is required' });
        }
        if (!commitment) {
            return res.status(400).json({ success: false, message: 'Commitment is required' });
        }
        if (!contactName) {
            return res.status(400).json({ success: false, message: 'Contact name is required' });
        }
        if (!contactEmail) {
            return res.status(400).json({ success: false, message: 'Contact email is required' });
        }
        if (!contactNumber) {
            return res.status(400).json({ success: false, message: 'Contact number is required' });
        }

        // Validate date fields based on isRange
        const isRangeBool = isRange === 'true' || isRange === true;
        if (isRangeBool) {
            if (!startDate || !endDate) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Start date and end date are required for date range events' 
                });
            }
        } else {
            if (!date) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Date is required for single date events' 
                });
            }
        }

        console.log(`Creating event for organizer: ${contactName} (${contactEmail})`);

        // Step 1: Add or update organizer
        const organiserResult = await eventModel.addOrganiser({
            name: contactName,
            email: contactEmail,
            phone: contactNumber
        });

        if (!organiserResult.success) {
            return res.status(400).json({ 
                success: false, 
                message: organiserResult.message || 'Failed to add organizer' 
            });
        }

        const organiserId = organiserResult.organiserId;
        console.log('Organizer ID:', organiserId);

        // Step 2: Create event record (without image path initially)
        const eventResult = await eventModel.addEvent({
            organiserId,
            name,
            isRange: isRangeBool,
            date: isRangeBool ? null : date,
            startDate: isRangeBool ? startDate : null,
            endDate: isRangeBool ? endDate : null,
            description,
            volunteersNeeded: parseInt(volunteersNeeded),
            location,
            type,
            commitment,
            skills: skills || '',
            imagePath: null // Will update after file upload
        });

        if (!eventResult.success) {
            return res.status(400).json({ 
                success: false, 
                message: eventResult.message || 'Failed to create event' 
            });
        }

        const eventId = eventResult.eventId;
        console.log('Event created with ID:', eventId);

        // Step 3: Handle image upload if present
        if (req.files && req.files.image && req.files.image.length > 0) {
            const imageFile = req.files.image[0];
            const imagePath = `uploads/events/${imageFile.filename}`;
            
            const updateImageResult = await eventModel.updateEventImage(eventId, imagePath);
            if (!updateImageResult.success) {
                console.error('Failed to update event image:', updateImageResult.message);
            } else {
                console.log('Event image updated:', imagePath);
            }
        }

        // Step 4: Handle document uploads if present
        if (req.files && req.files.documents && req.files.documents.length > 0) {
            const documents = req.files.documents.map(doc => ({
                filename: doc.originalname,
                path: `uploads/events/${doc.filename}`
            }));

            const addDocsResult = await eventModel.addDocuments(eventId, documents);
            if (!addDocsResult.success) {
                console.error('Failed to add event documents:', addDocsResult.message);
            } else {
                console.log('Documents added successfully:', documents.length);
            }
        }

        return res.status(201).json({ 
            success: true, 
            message: 'Event created successfully and is pending approval',
            event: {
                eventId: eventId,
                eventKey: eventResult.eventKey,
                name: name
            }
        });

    } catch (err) {
        console.error('Error creating event:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to create event',
            error: err.message
        });
    }
};

// Simplified version without file uploads for testing
const createEventMobileSimple = async (req, res) => {
    try {
        console.log('=== CREATE EVENT SIMPLE REQUEST ===');
        console.log('Request body:', req.body);
        console.log('====================================');

        const {
            name,
            isRange,
            date,
            startDate,
            endDate,
            description,
            volunteersNeeded,
            location,
            type,
            commitment,
            skills,
            contactName,
            contactEmail,
            contactNumber
        } = req.body;

        // Validate required fields
        if (!name) {
            return res.status(400).json({ success: false, message: 'Event name is required' });
        }
        if (!description) {
            return res.status(400).json({ success: false, message: 'Description is required' });
        }
        if (!volunteersNeeded) {
            return res.status(400).json({ success: false, message: 'Number of volunteers needed is required' });
        }
        if (!location) {
            return res.status(400).json({ success: false, message: 'Location is required' });
        }
        if (!type) {
            return res.status(400).json({ success: false, message: 'Event type is required' });
        }
        if (!commitment) {
            return res.status(400).json({ success: false, message: 'Commitment is required' });
        }
        if (!contactName) {
            return res.status(400).json({ success: false, message: 'Contact name is required' });
        }
        if (!contactEmail) {
            return res.status(400).json({ success: false, message: 'Contact email is required' });
        }
        if (!contactNumber) {
            return res.status(400).json({ success: false, message: 'Contact number is required' });
        }

        // Validate date fields based on isRange
        const isRangeBool = isRange === 'true' || isRange === true;
        if (isRangeBool) {
            if (!startDate || !endDate) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Start date and end date are required for date range events' 
                });
            }
        } else {
            if (!date) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Date is required for single date events' 
                });
            }
        }

        console.log(`Creating event for organizer: ${contactName} (${contactEmail})`);

        // Step 1: Add or update organizer
        const organiserResult = await eventModel.addOrganiser({
            name: contactName,
            email: contactEmail,
            phone: contactNumber
        });

        if (!organiserResult.success) {
            return res.status(400).json({ 
                success: false, 
                message: organiserResult.message || 'Failed to add organizer' 
            });
        }

        const organiserId = organiserResult.organiserId;
        console.log('Organizer ID:', organiserId);

        // Step 2: Create event record
        const eventResult = await eventModel.addEvent({
            organiserId,
            name,
            isRange: isRangeBool,
            date: isRangeBool ? null : date,
            startDate: isRangeBool ? startDate : null,
            endDate: isRangeBool ? endDate : null,
            description,
            volunteersNeeded: parseInt(volunteersNeeded),
            location,
            type,
            commitment,
            skills: skills || '',
            imagePath: null
        });

        if (!eventResult.success) {
            return res.status(400).json({ 
                success: false, 
                message: eventResult.message || 'Failed to create event' 
            });
        }

        const eventId = eventResult.eventId;
        console.log('Event created with ID:', eventId);

        return res.status(201).json({ 
            success: true, 
            message: 'Event created successfully and is pending approval',
            event: {
                eventId: eventId,
                eventKey: eventResult.eventKey,
                name: name
            }
        });

    } catch (err) {
        console.error('Error creating event (simple):', err);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to create event',
            error: err.message
        });
    }
};

module.exports = {
    getEventsController,
    getEventByIdController,
    createEventMobile,
    createEventMobileSimple
};