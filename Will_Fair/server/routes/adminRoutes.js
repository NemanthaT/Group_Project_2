import express from "express";
import { getAdminOverview } from "../controllers/adminController.js";
import { getDonorsAdmin } from "../controllers/donorController.js";

const router = express.Router();

// GET /admin/overview - dashboard stats and recent donations
router.get("/overview", getAdminOverview);
// GET /admin/donors - all donors for admin dashboard
router.get("/donors", getDonorsAdmin);

export default router;
