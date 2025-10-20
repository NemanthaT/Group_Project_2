// doneeRoute.js
import express from "express";
import upload from "../middleware/upload.js";
import { signUpDonee, getDoneeProfile, updateEmail, updatePassword } from "../controllers/doneeController.js";

const router = express.Router();

router.post('/signupDonee', upload.single('proofDocument'), signUpDonee);
router.get('/profile', getDoneeProfile);
router.put('/updateEmail', updateEmail);
router.put('/updatePassword', updatePassword);

export default router;