import { getEvents, addOrganiser, addEvent, addDocuments, updateEventImage, withdrawVolunteer, requestEventDeletion, getEventById } from "../models/eventModel.js";
import { sendEmail } from "../services/emailService.js";
import { eventCreationTemplate, volunteerUnregistrationTemplate } from "../services/emailTemplates.js";
import fs from "fs";
import path from "path";

// Formats a date value into YYYY-MM-DD string safely
const formatDate = (d) => {
    if (!d) return '';
    try {
        const dt = new Date(d);
        if (Number.isNaN(dt.getTime())) return String(d);
        return dt.toISOString().split('T')[0];
    } catch (e) { void e; return String(d); }
};

// Moves a file from temporary location to final destination
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

// Ensures a directory exists, creating it recursively if needed
const ensureDir = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Retrieves all events and returns them in a frontend-friendly format
export const getEventsController = async (req, res) => {
    try {
        const result = await getEvents();
        if (!result.success) {
            return res.status(400).json({ success: false, error: result.message });
        }

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
                raw: ev
            };
        });

        return res.status(200).json({ success: true, events: mapped });
    } catch (err) {
        console.error('Server error while fetching events:', err);
        return res.status(500).json({ success: false, error: 'Server error while fetching events' });
    }
};

// Creates a new event with organizer details, images, and documents
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

    if (!name || !location || !type || !commitment || !skills || !description || !contactName || !contactEmail || !contactNumber) {
        return res.status(400).json({
            success: false,
            error: "All required fields must be provided"
        });
    }

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

    if (!image) {
        return res.status(400).json({
            success: false,
            error: "Event image is required"
        });
    }

    if (!documents || documents.length === 0) {
        return res.status(400).json({
            success: false,
            error: "At least one proof document is required"
        });
    }

    try {
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
            imagePath: image.path
        });

        if (!eventResult.success) {
            return res.status(400).json({
                success: false,
                error: eventResult.message || "Failed to create event"
            });
        }

        const eventId = eventResult.eventId;
        const eventKey = eventResult.eventKey;

        const eventDir = path.join('uploads', 'events', String(eventId));
        const docsDir = path.join(eventDir, 'docs');
        
        ensureDir(eventDir);
        ensureDir(docsDir);

        const imageExt = path.extname(image.originalname);
        const imageName = `event_image${imageExt}`;
        const finalImagePath = path.join(eventDir, imageName).replace(/\\/g, '/');
        await moveFile(image, finalImagePath);

        const updateResult = await updateEventImage(eventId, finalImagePath);
        if (!updateResult.success) {
            console.error("Warning: Failed to update image path:", updateResult.message);
        }

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

        const docsResult = await addDocuments(eventId, documentData);

        if (!docsResult.success) {
            console.error("Warning: Failed to add documents to database:", docsResult.message);
        }

        try {
            const emailContent = eventCreationTemplate({
                title: name,
                description: description,
                location: location,
                date: isRangeBool ? `${startDate} to ${endDate}` : date,
                time: commitment,
                secretKey: eventKey,
                organizerName: contactName
            });

            await sendEmail({
                to: contactEmail,
                subject: emailContent.subject,
                text: emailContent.text,
                html: emailContent.html
            });

            console.log(`✅ Event creation email sent to ${contactEmail}`);
        } catch (emailError) {
            console.error("⚠️ Failed to send event creation email:", emailError.message);
        }

        return res.status(201).json({
            success: true,
            message: "Event created successfully",
            eventId: eventId
        });

    } catch (err) {
        console.error("Error in createEvent:", err);
        
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

// Processes volunteer withdrawal from an event and sends confirmation email
export const withdrawVolunteerController = async (req, res) => {
  try {
    const { email, volunteerKey } = req.body;
    
    if (!email || !volunteerKey) {
      return res.status(400).json({
        success: false,
        message: 'Email and volunteer key are required'
      });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    if (!volunteerKey.startsWith('VOL-')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid volunteer key format'
      });
    }
    
    const result = await withdrawVolunteer(email, volunteerKey);
    
    if (!result.success) {
      return res.status(404).json(result);
    }

    const eventResult = await getEventById(result.volunteer.event_id);
    
    if (eventResult.success) {
      try {
        const emailContent = volunteerUnregistrationTemplate({
          volunteerName: result.volunteer.volunteer_name,
          eventTitle: eventResult.event.name
        });

        await sendEmail({
          to: email,
          subject: emailContent.subject,
          text: emailContent.text,
          html: emailContent.html
        });

        console.log(`✅ Volunteer unregistration email sent to ${email}`);
      } catch (emailError) {
        console.error('⚠️ Failed to send unregistration email:', emailError.message);
      }
    } else {
      console.error('⚠️ Could not fetch event details for unregistration email');
    }
    
    return res.status(200).json({
      ...result,
      emailSent: true
    });
    
  } catch (error) {
    console.error('Error in withdrawVolunteerController:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error occurred while processing withdrawal'
    });
  }
};

// Handles event organizer's request to delete their event
export const requestEventDeletionController = async (req, res) => {
  try {
    const { email, eventKey } = req.body;
    
    if (!email || !eventKey) {
      return res.status(400).json({
        success: false,
        message: 'Email and event key are required'
      });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    if (!eventKey.startsWith('EVT-')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid event key format'
      });
    }
    
    const result = await requestEventDeletion(email, eventKey);
    
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
    
  } catch (error) {
    console.error('Error in requestEventDeletionController:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error occurred while processing deletion request'
    });
  }
};