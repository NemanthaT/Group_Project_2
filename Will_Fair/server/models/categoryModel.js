import pool from "../db.js";

// Get all donation categories for admin dashboard
async function getAllCategories() {
  const sql = `
        SELECT
            category_id AS id,
            category_name AS name,
            description,
            status,
            is_monetary
        FROM donation_categories
        ORDER BY category_name;
    `;
  try {
    const { rows } = await pool.query(sql);
    return rows.map((row) => ({
      ...row,
      type:
        row.is_monetary === true || row.is_monetary === "TRUE"
          ? "Monetary"
          : "Non-Monetary",
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

// Add a new donation category
async function addCategory({ name, description, type }) {
  type = type === "Monetary" ? "TRUE" : "FALSE";
  const sql = `INSERT INTO donation_categories (category_name, description, is_monetary, status)
               VALUES ($1, $2, $3, 'Active') RETURNING category_id AS id, category_name AS name, description, is_monetary, status`;
  const values = [name, description || "", type];
  const { rows } = await pool.query(sql, values);
  return rows[0];
}

export { getAllCategories, addCategory };
