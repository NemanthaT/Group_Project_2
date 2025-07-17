import express from "express";
import {
  signUpDonor,
} from "../controllers/donorController.js";

const router = express.Router();

router.post("/signupDonor", signUpDonor);

export default router;