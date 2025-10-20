// Guest User Routes
const express = require('express');
const router = express.Router();
const guestuserController = require('../controllers/guestuserController');

// POST /api/guestuser_reg - Register new guest user
router.post('/guestuser_reg', guestuserController.registerGuestUser);

// POST /api/guestuser_login - Login guest user
router.post('/guestuser_login', guestuserController.loginGuestUser);

module.exports = router;
