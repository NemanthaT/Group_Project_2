import express from "express";
import { 
  createMonDonation,
  createNonMonDonation, 
  getDoneeDonations,
  getMonetaryCategories,
  getNonMonetaryCategories
} from "../controllers/donationController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

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

router.get('/donee/:doneeId', getDoneeDonations);

// Public routes
router.get('/monetaryCategories', getMonetaryCategories);
router.get('/nonMonetaryCategories', getNonMonetaryCategories);

export default router;