import express from "express";
import upload from "../middleware/upload.js";
import { 
  createMonDonation,
  createNonMonDonation, 
  getDoneeDonations,
  getMonetaryCategories,
  getNonMonetaryCategories,
  getDonationsByDonee
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

export default router;