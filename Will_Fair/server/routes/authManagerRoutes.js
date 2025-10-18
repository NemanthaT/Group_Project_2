import express from "express";
import {
  getPendingDonationsController,
  acceptDonationRequestController,
  rejectDonationRequestController,
  getPendingDonationDetailController,
  getDonationStatsController,
  getPendingEventsController
} from "../controllers/authManagerController.js";

const router = express.Router();

router.get("/pending-donations", getPendingDonationsController);
router.get("/pending-donations/:id", getPendingDonationDetailController);
router.post("/pending-donations/:id/accept", acceptDonationRequestController);
router.post("/pending-donations/:id/reject", rejectDonationRequestController);
router.get("/donation-stats", getDonationStatsController);
router.get('/pending-events', getPendingEventsController);

export default router;
