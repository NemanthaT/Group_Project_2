const express = require('express');
const router = express.Router();
const { getRecentDonationsMobile, getAllDonationsMobile, getDonationByIdMobile, addDonationAmountMobile } = require('../controllers/donationController');
// POST /api/donations/add-amount
router.post('/donations/add-amount', addDonationAmountMobile);


// GET /api/donations/recent
router.get('/donations/recent', getRecentDonationsMobile);

// GET /api/donations/all
router.get('/donations/all', getAllDonationsMobile);

module.exports = router;
// GET /api/donations/:id
router.get('/donations/:id', getDonationByIdMobile);
