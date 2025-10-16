// Category Model
const pool = require('../config/db');

exports.getMonetaryCategories = async () => {
  const result = await pool.query(
    `SELECT category_name FROM donation_categories WHERE is_monetary = true ORDER BY category_name`
  );
  return result.rows.map((r) => r.category_name);
};

exports.getNonMonetaryCategories = async () => {
  const result = await pool.query(
    `SELECT category_name FROM donation_categories WHERE is_monetary = false ORDER BY category_name`
  );
  return result.rows.map((r) => r.category_name);
};

exports.getAllCategories = async () => {
  const result = await pool.query(
    `SELECT category_id, category_name FROM donation_categories ORDER BY category_name`
  );
  return result.rows.map((r) => ({ id: r.category_id, name: r.category_name }));
};
