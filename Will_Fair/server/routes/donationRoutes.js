import express from "express";
import upload from "../middleware/upload.js";
import { 
  createMonDonation,
  createNonMonDonation, 
  getDoneeDonations,
  getMonetaryCategories,
  getNonMonetaryCategories,
  getDonationsByDonee,
  deleteDonation,
  getRecentDonationsController
} from "../controllers/donationController.js";
import multer from "multer";

const router = express.Router();

// Protected routes
router.post('/createMonDonation', upload.fields([{
  name: 'image', maxCount: 1
}, {
  name: 'documents', maxCount: 5
}]), createMonDonation);

router.post('/createNonMonDonation', upload.fields([{
  name: 'image', maxCount: 1
}, {
  name: 'documents', maxCount: 5
}]), createNonMonDonation);

router.post('/getDonationsById', getDoneeDonations);

// Get all donation requests for a donee (dashboard)
router.post('/dashboardRequests', getDonationsByDonee);

// Public routes
router.get('/monetaryCategories', getMonetaryCategories);
router.get('/nonMonetaryCategories', getNonMonetaryCategories);
router.get('/recent', getRecentDonationsController);

// Get a single donation by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await import('../models/donationModel.js').then(m => m.getDonationById(id));
    if (result.success) {
      res.status(200).json({ success: true, donation: result.donation });
    } else {
      res.status(404).json({ success: false, error: result.message });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error while fetching donation' });
  }
});

// Update a donation by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await import('../models/donationModel.js').then(m => m.updateDonationById(id, req.body));
    if (result.success) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, error: result.message });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error while updating donation' });
  }
});

// Add DELETE endpoint for donation
router.delete('/:id', deleteDonation);

export default router;