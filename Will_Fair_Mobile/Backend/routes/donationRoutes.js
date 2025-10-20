const express = require('express');
const router = express.Router();
const { getRecentDonationsMobile, getAllDonationsMobile, getDonationByIdMobile, addDonationAmountMobile, getMyDonationRequestsMobile, deleteDonationRequestMobile, createDonationRequestMobile, updateDonationRequestMobile } = require('../controllers/donationController');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads (same as donee registration)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Images go to uploads/images/, documents go to uploads/temp/
    if (file.fieldname === 'image') {
      cb(null, 'uploads/images/');
    } else if (file.fieldname === 'document') {
      cb(null, 'uploads/temp/');
    } else {
      cb(null, 'uploads/');
    }
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// POST /api/donations/add-amount - MUST come before generic /donations routes
router.post('/donations/add-amount', addDonationAmountMobile);

// POST /api/donations - Create new donation request with file uploads
router.post('/donations', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'document', maxCount: 1 }
]), createDonationRequestMobile);

// PUT /api/donations/:id - Update donation request (only quantity_needed and due_date)
router.put('/donations/:id', updateDonationRequestMobile);

// DELETE /api/donations/:id - Delete donation request
router.delete('/donations/:id', deleteDonationRequestMobile);

// GET /api/donations/recent
router.get('/donations/recent', getRecentDonationsMobile);

// GET /api/donations/all
router.get('/donations/all', getAllDonationsMobile);

// GET /api/donations/my/:doneeId - MUST come before /donations/:id
router.get('/donations/my/:doneeId', getMyDonationRequestsMobile);

// GET /api/donations/:id - This should be last as it's most generic
router.get('/donations/:id', getDonationByIdMobile);

module.exports = router;
