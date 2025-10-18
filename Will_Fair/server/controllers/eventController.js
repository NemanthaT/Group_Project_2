import { getEvents, addOrganiser, addEvent, addDocuments, updateEventImage } from "../models/eventModel.js";
import fs from "fs";
import path from "path";

// Helper to format a date value into YYYY-MM-DD (safe)
const formatDate = (d) => {
    if (!d) return '';
    try {
        const dt = new Date(d);
        if (Number.isNaN(dt.getTime())) return String(d);
        return dt.toISOString().split('T')[0];
    } catch (e) { void e; return String(d); }
};

// Helper to move file from temp to final destination
const moveFile = (file, destinationPath) => {
    return new Promise((resolve, reject) => {
        const sourcePath = file.path;
        fs.rename(sourcePath, destinationPath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(destinationPath);
            }
        });
    });
};

// Helper to ensure directory exists
const ensureDir = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

//Controller to get all events and return them in a frontend-friendly shape
export const getEventsController = async (req, res) => {
    try {
        const result = await getEvents();
        if (!result.success) {
            return res.status(400).json({ success: false, error: result.message });
        }

        // Build absolute base for image URLs from request (does not change server.js)
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
                raw: ev // include raw row for any future needs
            };
        });

        return res.status(200).json({ success: true, events: mapped });
    } catch (err) {
        console.error('Server error while fetching events:', err);
        return res.status(500).json({ success: false, error: 'Server error while fetching events' });
    }
};

// Controller for creating a new event
export const createEvent = async (req, res) => {
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

    const image = req.files?.image?.[0];
    const documents = req.files?.documents;

    console.log("Creating event with data:", req.body);
    console.log("Image file:", image);
    console.log("Documents:", documents);

    // Validate required fields
    if (!name || !location || !type || !commitment || !skills || !description || !contactName || !contactEmail || !contactNumber) {
        return res.status(400).json({
            success: false,
            error: "All required fields must be provided"
        });
    }

    // Validate date fields
    const isRangeBool = isRange === 'true' || isRange === true;
    if (!isRangeBool && !date) {
        return res.status(400).json({
            success: false,
            error: "Event date is required"
        });
    }
    if (isRangeBool && (!startDate || !endDate)) {
        return res.status(400).json({
            success: false,
            error: "Start date and end date are required for date range events"
        });
    }

    // Validate image upload
    if (!image) {
        return res.status(400).json({
            success: false,
            error: "Event image is required"
        });
    }

    // Validate documents upload
    if (!documents || documents.length === 0) {
        return res.status(400).json({
            success: false,
            error: "At least one proof document is required"
        });
    }

    try {
        // Step 1: Create organiser
        const organiserResult = await addOrganiser({
            name: contactName,
            email: contactEmail,
            phone: contactNumber
        });

        if (!organiserResult.success) {
            return res.status(400).json({
                success: false,
                error: organiserResult.message || "Failed to create organiser"
            });
        }

        const organiserId = organiserResult.organiserId;

        // Step 2: Create event with temporary image path
        const eventResult = await addEvent({
            organiserId,
            name,
            isRange: isRangeBool,
            date: isRangeBool ? null : date,
            startDate: isRangeBool ? startDate : null,
            endDate: isRangeBool ? endDate : null,
            description,
            volunteersNeeded: parseInt(volunteersNeeded) || 1,
            location,
            type,
            commitment,
            skills,
            imagePath: image.path // temporary path for now
        });

        if (!eventResult.success) {
            return res.status(400).json({
                success: false,
                error: eventResult.message || "Failed to create event"
            });
        }

        const eventId = eventResult.eventId;

        // Step 3: Move files from temp to final destination
        const eventDir = path.join('uploads', 'events', String(eventId));
        const docsDir = path.join(eventDir, 'docs');
        
        ensureDir(eventDir);
        ensureDir(docsDir);

        // Move image
        const imageExt = path.extname(image.originalname);
        const imageName = `event_image${imageExt}`;
        const finalImagePath = path.join(eventDir, imageName).replace(/\\/g, '/');
        await moveFile(image, finalImagePath);

        // Update event with final image path using model function
        const updateResult = await updateEventImage(eventId, finalImagePath);
        if (!updateResult.success) {
            console.error("Warning: Failed to update image path:", updateResult.message);
        }

        // Step 4: Move documents and add to database
        const documentData = [];
        for (let i = 0; i < documents.length; i++) {
            const doc = documents[i];
            const docExt = path.extname(doc.originalname);
            const docName = `document_${i + 1}${docExt}`;
            const finalDocPath = path.join(docsDir, docName).replace(/\\/g, '/');
            
            await moveFile(doc, finalDocPath);
            
            documentData.push({
                filename: doc.originalname,
                path: finalDocPath
            });
        }

        // Step 5: Add documents to database
        const docsResult = await addDocuments(eventId, documentData);

        if (!docsResult.success) {
            console.error("Warning: Failed to add documents to database:", docsResult.message);
        }

        return res.status(201).json({
            success: true,
            message: "Event created successfully",
            eventId: eventId
        });

    } catch (err) {
        console.error("Error in createEvent:", err);
        
        // Clean up uploaded files on error
        try {
            if (image && fs.existsSync(image.path)) {
                fs.unlinkSync(image.path);
            }
            if (documents) {
                documents.forEach(doc => {
                    if (fs.existsSync(doc.path)) {
                        fs.unlinkSync(doc.path);
                    }
                });
            }
        } catch (cleanupErr) {
            console.error("Error cleaning up files:", cleanupErr);
        }

        return res.status(500).json({
            success: false,
            error: "Server error during event creation"
        });
    }
};