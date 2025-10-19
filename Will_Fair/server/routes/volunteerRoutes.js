import express from "express";
import { registerVolunteer } from "../controllers/volunteerController.js";

const router = express.Router();

// POST /api/volunteers
router.post("/", registerVolunteer);

export default router;
