// server/controllers/categoryController.js
import pool from "../db.js";

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
