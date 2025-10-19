// server/controllers/categoryController.js
import pool from "../db.js";
import { getAllCategories, addCategory } from "../models/categoryModel.js";

/**
 * GET /categories
 * Returns all product categories.
 */
export async function getCategories(req, res) {
  const sql = `
    SELECT
      category_id AS id,
      category_name AS name,
      description
    FROM product_categories
    ORDER BY category_name;
  `;
  try {
    const { rows } = await pool.query(sql);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}

// GET /admin/categories - Returns all donation categories for admin dashboard
export async function getCategoriesAdmin(req, res) {
  try {
    const categories = await getAllCategories();
    res.json({ success: true, categories });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ success: false, error: "Failed to fetch categories" });
  }
}

// POST /admin/categories - Add a new donation category
export async function addCategoryAdmin(req, res) {
  const { name, description, type } = req.body;
  if (!name || !type) {
    return res.status(400).json({ success: false, error: "Name and type are required" });
  }
  try {
    const category = await addCategory({ name, description, type });
    res.json({ success: true, category });
  } catch (err) {
    console.error("Error adding category:", err);
    res.status(500).json({ success: false, error: "Failed to add category" });
  }
}
