import express from "express";
import {
  signUpDonor,
} from "../controllers/donorController.js";

const router = express.Router();

router.post("/signup", signUpDonor);

export default router;