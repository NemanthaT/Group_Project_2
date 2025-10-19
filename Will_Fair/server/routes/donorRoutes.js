import express from "express";
import {
  signUpDonor,
  getDonorProfile,
  updatePhone,
  updatePassword
} from "../controllers/donorController.js";

const router = express.Router();

router.post("/signupDonor", signUpDonor);
router.get("/profile", getDonorProfile);
router.put("/updatePhone", updatePhone);
router.put("/updatePassword", updatePassword);

export default router;