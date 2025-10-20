// Event Routes for Mobile Backend
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads', 'events');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: function (req, file, cb) {
        // Accept images and documents
        const allowedImageTypes = /jpeg|jpg|png|gif/;
        const allowedDocTypes = /pdf|doc|docx/;
        const extname = path.extname(file.originalname).toLowerCase();
        
        if (file.fieldname === 'image') {
            const isValidImage = allowedImageTypes.test(extname.slice(1));
            if (isValidImage) {
                cb(null, true);
            } else {
                cb(new Error('Only image files (jpeg, jpg, png, gif) are allowed for event image'));
            }
        } else if (file.fieldname === 'documents') {
            const isValidDoc = allowedDocTypes.test(extname.slice(1)) || allowedImageTypes.test(extname.slice(1));
            if (isValidDoc) {
                cb(null, true);
            } else {
                cb(new Error('Only pdf, doc, docx, and image files are allowed for documents'));
            }
        } else {
            cb(new Error('Unexpected field'));
        }
    }
});

// Public Routes
// Get all events
router.get('/events', eventController.getEventsController);

// Get a single event by ID
router.get('/events/:id', eventController.getEventByIdController);

// POST /api/events/simple - Create event without file uploads (for testing)
router.post('/events/simple', eventController.createEventMobileSimple);

// POST /api/events - Create new event with file uploads
router.post('/events', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'documents', maxCount: 5 }
]), eventController.createEventMobile);

// POST /api/events/test - Simple test endpoint without file upload
router.post('/events/test', (req, res) => {
    console.log('Test endpoint hit!');
    console.log('Body:', req.body);
    res.json({ success: true, message: 'Test endpoint works', body: req.body });
});

module.exports = router;