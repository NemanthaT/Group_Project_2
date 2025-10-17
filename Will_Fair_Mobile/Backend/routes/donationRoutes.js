const express = require('express');
const router = express.Router();
const { getRecentDonationsMobile, getAllDonationsMobile, getDonationByIdMobile } = require('../controllers/donationController');


// GET /api/donations/recent
router.get('/donations/recent', getRecentDonationsMobile);

// GET /api/donations/all
router.get('/donations/all', getAllDonationsMobile);

module.exports = router;
// GET /api/donations/:id
router.get('/donations/:id', getDonationByIdMobile);
