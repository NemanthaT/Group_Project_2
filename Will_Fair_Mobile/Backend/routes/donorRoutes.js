
// Donor Routes
const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');

console.log('=== DONOR ROUTES LOADED ===');
console.log('donorController.updateDonorProfile exists:', typeof donorController.updateDonorProfile);

router.post('/donor_login', donorController.loginDonor);

router.post('/donor_reg', donorController.registerDonor);

// Update donor profile (first_name, last_name, password)
router.put('/donor/:donor_id', donorController.updateDonorProfile);

console.log('PUT route registered: /donor/:donor_id');

module.exports = router;
