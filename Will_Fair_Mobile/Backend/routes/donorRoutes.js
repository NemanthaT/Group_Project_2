
// Donor Routes
const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');

router.post('/donor_login', donorController.loginDonor);

router.post('/donor_reg', donorController.registerDonor);

module.exports = router;
