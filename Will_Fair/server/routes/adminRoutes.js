import express from "express";
import { getAdminOverview } from "../controllers/adminController.js";
import { getDonorsAdmin } from "../controllers/donorController.js";
import { getDoneesAdmin } from "../controllers/doneeController.js";
import { getCategoriesAdmin, addCategoryAdmin, toggleCategoryAdmin, deleteCategoryAdmin, editCategoryAdmin } from "../controllers/categoryController.js";

const router = express.Router();

// GET /admin/overview - dashboard stats and recent donations
router.get("/overview", getAdminOverview);
// GET /admin/donors - all donors for admin dashboard
router.get("/donors", getDonorsAdmin);
// GET /admin/donees - donee details for dashboard
router.get("/donees", getDoneesAdmin);
// GET /admin/categories - category details for dashboard
router.get("/categories", getCategoriesAdmin);
// POST /admin/categories - add a new category
router.post("/categories", addCategoryAdmin);
// PATCH /admin/categories/:id/toggle - toggle category status
router.patch("/categories/:id/toggle", toggleCategoryAdmin);
// DELETE /admin/categories/:id - delete a category
router.delete("/categories/:id", deleteCategoryAdmin);
// PUT /admin/categories/:id - edit a category
router.put("/categories/:id", editCategoryAdmin);

export default router;
