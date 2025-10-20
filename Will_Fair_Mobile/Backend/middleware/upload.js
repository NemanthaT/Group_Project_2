const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Storage configuration for events
const eventStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;
    
    if (file.fieldname === 'image') {
      uploadPath = path.join(__dirname, '../uploads/events');
    } else if (file.fieldname === 'documents') {
      uploadPath = path.join(__dirname, '../uploads/events/documents');
    } else {
      uploadPath = path.join(__dirname, '../uploads/temp');
    }
    
    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  }
});

// File filter for events (images and PDFs)
const eventFileFilter = (req, file, cb) => {
  if (file.fieldname === 'image') {
    // Accept images only
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for event image'), false);
    }
  } else if (file.fieldname === 'documents') {
    // Accept PDFs only
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed for event documents'), false);
    }
  } else {
    cb(null, true);
  }
};

// Multer upload middleware for events
const uploadEvent = multer({
  storage: eventStorage,
  fileFilter: eventFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max per file
  }
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'documents', maxCount: 5 }
]);

module.exports = {
  uploadEvent
};