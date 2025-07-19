// donationRoute.js
import express from "express";
import { 
  createMonDonation,
  createNonMonDonation, 
  getDoneeDonations,
  getMonetaryCategories,
  getNonMonetaryCategories
} from "../controllers/donationController.js";
//import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes
router.post('/createMonDonation', createMonDonation);
router.post('/createNonMonDonation', createNonMonDonation);

router.get('/donee/:doneeId', getDoneeDonations);

// Public route
router.get('/monetaryCategories', getMonetaryCategories);
router.get('/nonMonetaryCategories', getNonMonetaryCategories);

export default router;