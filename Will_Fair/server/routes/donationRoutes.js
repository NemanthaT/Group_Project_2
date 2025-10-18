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
  getRecentDonationsController,
  getActiveDonationsController,
  getDonationStatsController,
  getDonationByIdController,
  getDonationsForRegController,
  markCompleted,
  markSent
} from "../controllers/donationController.js";

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
router.get('/active', getActiveDonationsController);
router.get('/stats', getDonationStatsController);
router.get('/donations/:id', getDonationByIdController);

// RegManager Routes
router.get('/donationsReg', getDonationsForRegController);
// PATCH endpoints for donation status
router.patch('/:id/completed', markCompleted);
router.patch('/:id/sent', markSent);

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
  } catch {
    res.status(500).json({ success: false, error: 'Server error while fetching donation' });
  }
});

// Update a donation by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { amount, donorId } = req.body;
    const result = await import('../models/donationModel.js').then(m => m.updateDonationById(id, amount, donorId));
    if (result.success) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, error: result.message });
    }
  } catch {
    res.status(500).json({ success: false, error: 'Server error while updating donation' });
  }
});

// Add DELETE endpoint for donation
router.delete('/:id', deleteDonation);

// Add donation endpoint for donor to update received amount
router.post('/:id/donate', async (req, res) => {
  const { id } = req.params;
  const { amount, donorId } = req.body;
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ success: false, error: 'Invalid donation amount' });
  }
  if (!donorId) {
    return res.status(400).json({ success: false, error: 'Missing donorId' });
  }
  try {
    const result = await import('../models/donationModel.js').then(m => m.addDonationAmount(id, Number(amount), donorId));
    if (result.success) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, error: result.message });
    }
  } catch {
    res.status(500).json({ success: false, error: 'Server error while processing donation' });
  }
});

export default router;