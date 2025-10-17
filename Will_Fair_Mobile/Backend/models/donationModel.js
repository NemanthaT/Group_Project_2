const db = require('../config/db');

exports.getRecentDonations = async (limit = 3) => {
  const result = await db.query(
    `SELECT request_id, title, quantity_needed, quantity_received, due_date, image_path
     FROM donation_requests
     WHERE status = 'active'
     ORDER BY due_date ASC
     LIMIT $1;`,
    [limit]
  );
  return result.rows;
};

// Fetch all donation requests (for 'View All')
exports.getAllDonations = async () => {
  const result = await db.query(
    `SELECT request_id, title, quantity_needed, quantity_received, due_date, image_path
     FROM donation_requests
     WHERE status = 'active'
     ORDER BY due_date ASC;`
  );
  return result.rows;
};
