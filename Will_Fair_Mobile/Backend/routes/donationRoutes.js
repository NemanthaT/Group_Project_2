const express = require('express');
const router = express.Router();
const { getRecentDonationsMobile, getAllDonationsMobile, getDonationByIdMobile, addDonationAmountMobile, getMyDonationRequestsMobile } = require('../controllers/donationController');

// POST /api/donations/add-amount
router.post('/donations/add-amount', addDonationAmountMobile);

// GET /api/donations/recent
router.get('/donations/recent', getRecentDonationsMobile);

// GET /api/donations/all
router.get('/donations/all', getAllDonationsMobile);

// GET /api/donations/my/:doneeId - MUST come before /donations/:id
router.get('/donations/my/:doneeId', getMyDonationRequestsMobile);

// GET /api/donations/:id - This should be last as it's most generic
router.get('/donations/:id', getDonationByIdMobile);

module.exports = router;
