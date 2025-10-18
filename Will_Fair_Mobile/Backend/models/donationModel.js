
// Add donation and update quantity_received (for Will_Fair_Mobile backend)
exports.addDonationAmount = async (request_id, amount, donor_id) => {
  try {
    // Get current received amount
    const result = await db.query(
      'SELECT quantity_received FROM donation_requests WHERE request_id = $1',
      [request_id]
    );
    if (result.rows.length === 0) {
      return { success: false, message: 'Donation request not found' };
    }
    // Insert into donations table
    await db.query(
      'INSERT INTO donations (request_id, donor_id, amount) VALUES ($1, $2, $3)',
      [request_id, donor_id, amount]
    );
    const current = Number(result.rows[0].quantity_received) || 0;
    const newAmount = current + Number(amount);
    // Update donation_requests table
    await db.query(
      'UPDATE donation_requests SET quantity_received = $1 WHERE request_id = $2',
      [newAmount, request_id]
    );
    return { success: true };
  } catch (err) {
    console.error('Database error during addDonationAmount():', err);
    return { success: false, message: 'Database error' };
  }
};
const db = require('../config/db');

exports.getRecentDonations = async (limit = 3) => {
  const result = await db.query(
    `SELECT request_id, title, quantity_needed, quantity_received, due_date, image_path, type
     FROM donation_requests
     WHERE status = 'active'
     ORDER BY due_date DESC
     LIMIT $1;`,
    [limit]
  );
  return result.rows;
};

// Fetch all donation requests (for 'View All')
exports.getAllDonations = async () => {
  const result = await db.query(
    `SELECT request_id, title, quantity_needed, quantity_received, due_date, image_path, type
     FROM donation_requests
     WHERE status = 'active'
     ORDER BY due_date ASC;`
  );
  return result.rows;
};

// Fetch single donation request by ID
exports.getDonationById = async (requestId) => {
  const result = await db.query(
    `SELECT dr.request_id, dr.title, dr.quantity_needed, dr.quantity_received, dr.due_date, dr.image_path, dr.type, dr.category_id, dc.category_name AS category, dr.description, dr.donee_id AS organizer, dr.status
     FROM donation_requests dr
     LEFT JOIN donation_categories dc ON dr.category_id = dc.category_id
     WHERE dr.request_id = $1;`,
    [requestId]
  );
  return result.rows[0];
};
