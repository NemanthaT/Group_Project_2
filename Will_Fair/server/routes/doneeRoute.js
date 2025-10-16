// doneeRoute.js
import express from "express";
import upload from "../middleware/upload.js";
import { signUpDonee } from "../controllers/doneeController.js";

const router = express.Router();

router.post('/signupDonee', upload.single('proofDocument'), signUpDonee);

export default router;