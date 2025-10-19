import express from "express";
import {
  getPendingDonationsController,
  acceptDonationRequestController,
  rejectDonationRequestController,
  getPendingDonationDetailController,
  getDonationStatsController,
  getPendingEventsController,
  getPendingDeletionEventsController,
  approveEventController,
  deleteEventController,
  getPendingEventsCountController,
  getPendingDeletionEventsCountController,
  getEventCountsController
} from "../controllers/authManagerController.js";

const router = express.Router();

router.get("/pending-donations", getPendingDonationsController);
router.get("/pending-donations/:id", getPendingDonationDetailController);
router.post("/pending-donations/:id/accept", acceptDonationRequestController);
router.post("/pending-donations/:id/reject", rejectDonationRequestController);
router.get("/donation-stats", getDonationStatsController);

// Event related routes
router.get('/pending-events', getPendingEventsController);
router.get('/pending-deletion-events', getPendingDeletionEventsController);
router.post('/approve-event/:id', approveEventController);
router.delete('/delete-event/:id', deleteEventController);
router.get('/pending-events-count', getPendingEventsCountController);
router.get('/pending-deletion-events-count', getPendingDeletionEventsCountController);
router.get('/event-counts', getEventCountsController);

export default router;
