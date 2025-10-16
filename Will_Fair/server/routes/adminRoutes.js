import express from "express";
import { getAdminOverview } from "../controllers/adminController.js";

const router = express.Router();

// GET /admin/overview - dashboard stats and recent donations
router.get("/overview", getAdminOverview);

export default router;
