// donationRoute.js
import express from "express";
import { 
  createDonation, 
  getDoneeDonations,
  getCategories
} from "../controllers/donationController.js";
//import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes
router.post('/', createDonation);
router.get('/donee/:doneeId', getDoneeDonations);

// Public route
router.get('/categories', getCategories);

export default router;