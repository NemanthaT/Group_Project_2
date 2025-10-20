// Donee Routes
const express = require('express');
const router = express.Router();
const doneeController = require('../controllers/doneeController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
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

router.post('/donee_ind_reg', upload.single('proofDocument'), doneeController.registerIndividual);
router.post('/donee_rep_reg', upload.single('proofDocument'), doneeController.registerRepresentative);
router.post('/donee_login', doneeController.login);

module.exports = router;
