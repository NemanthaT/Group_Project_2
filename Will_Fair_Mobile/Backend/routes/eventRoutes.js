// Event Routes for Mobile Backend
const express = require('express');
const multer = require('multer');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Create a separate multer configuration for events
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/temp/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const eventUpload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Check mimetype for proper validation
        const allowedMimeTypes = [
            'application/pdf',
            'image/jpeg',
            'image/jpg', 
            'image/png'
        ];
        
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error(`Invalid file type. Only PDF and image files allowed. Got: ${file.mimetype}`), false);
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024  // 10MB for events
    }
});

// Public Routes
router.get('/', eventController.getEventsController);
router.get('/:id', eventController.getEventByIdController);
router.post('/', eventUpload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'documents', maxCount: 5 }
]), eventController.createEvent);

module.exports = router;
