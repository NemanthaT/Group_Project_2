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

// PATCH /admin/categories/:id/toggle - Toggle category status
export async function toggleCategoryAdmin(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE donation_categories SET status = CASE WHEN status = 'Active' THEN 'Inactive' ELSE 'Active' END WHERE category_id = $1 RETURNING status`,
      [id]
    );
    if (result.rows.length) {
      res.json({ success: true, status: result.rows[0].status });
    } else {
      res.status(404).json({ success: false, error: "Category not found" });
    }
  } catch {
    res.status(500).json({ success: false, error: "Failed to toggle category" });
  }
}

// DELETE /admin/categories/:id - Delete category
export async function deleteCategoryAdmin(req, res) {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM donation_categories WHERE category_id = $1`, [id]);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, error: "Failed to delete category" });
  }
}

// PUT /admin/categories/:id - Edit category
export async function editCategoryAdmin(req, res) {
  const { id } = req.params;
  const { name, description, type } = req.body;
  try {
    const dtype = type == 'Monetary' ? 'True' : 'False';
    await pool.query(
      `UPDATE donation_categories SET category_name = $1, description = $2, type = $3 WHERE category_id = $4`,
      [name, description, dtype, id]
    );
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, error: "Failed to update category" });
  }
}
