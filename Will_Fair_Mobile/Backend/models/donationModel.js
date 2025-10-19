
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
    `SELECT dr.request_id, dr.title, dr.quantity_needed, dr.quantity_received, dr.due_date, dr.type, dr.category_id, dc.category_name
     FROM donation_requests dr
     LEFT JOIN donation_categories dc ON dr.category_id = dc.category_id
     WHERE dr.status = 'active'
     ORDER BY dr.due_date DESC
     LIMIT $1;`,
    [limit]
  );
  return result.rows;
};

// Fetch all donation requests (for 'View All')
exports.getAllDonations = async () => {
  const result = await db.query(
    `SELECT dr.request_id, dr.title, dr.quantity_needed, dr.quantity_received, dr.due_date, dr.type, dr.category_id, dc.category_name
     FROM donation_requests dr
     LEFT JOIN donation_categories dc ON dr.category_id = dc.category_id
     WHERE dr.status = 'active'
     ORDER BY dr.due_date ASC;`
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

// Fetch donation requests by donee_id (for My Donation Requests)
exports.getDonationsByDoneeId = async (doneeId) => {
  const result = await db.query(
    `SELECT dr.request_id, dr.title, dr.quantity_needed, dr.quantity_received, dr.due_date, dr.type, dr.category_id, dc.category_name, dr.status, dr.created_at
     FROM donation_requests dr
     LEFT JOIN donation_categories dc ON dr.category_id = dc.category_id
     WHERE dr.donee_id = $1
     ORDER BY dr.created_at DESC;`,
    [doneeId]
  );
  return result.rows;
};

// Delete donation request by ID (only if status is 'pending')
exports.deleteDonationRequest = async (requestId, doneeId) => {
  try {
    // First check if the request exists and belongs to the donee
    const checkResult = await db.query(
      'SELECT request_id, status, donee_id FROM donation_requests WHERE request_id = $1',
      [requestId]
    );

    if (checkResult.rows.length === 0) {
      return { success: false, message: 'Donation request not found' };
    }

    const request = checkResult.rows[0];

    // Verify the request belongs to the donee
    if (request.donee_id !== parseInt(doneeId)) {
      return { success: false, message: 'Unauthorized: This request does not belong to you' };
    }

    // Check if status is pending
    if (request.status?.toLowerCase() !== 'pending') {
      return { success: false, message: 'Only pending requests can be deleted' };
    }

    // Delete the request
    await db.query(
      'DELETE FROM donation_requests WHERE request_id = $1',
      [requestId]
    );

    return { success: true, message: 'Donation request deleted successfully' };
  } catch (err) {
    console.error('Database error during deleteDonationRequest():', err);
    return { success: false, message: 'Database error: ' + err.message };
  }
};
