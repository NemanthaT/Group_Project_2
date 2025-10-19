import express from "express";
import {
  signUpDonor,
  getDonorProfile
} from "../controllers/donorController.js";

const router = express.Router();

router.post("/signupDonor", signUpDonor);
router.get("/profile", getDonorProfile);

export default router;