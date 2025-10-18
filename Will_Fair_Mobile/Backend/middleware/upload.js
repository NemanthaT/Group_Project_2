// upload.js - Multer middleware for file uploads
const multer = require('multer');
const path = require('path');

// Create temporary upload directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/temp/'); // Temporary upload directory
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
    fileSize: 10 * 1024 * 1024  // 10MB limit
  }
});

module.exports = eventUpload;
