import pool from "../db.js";

// Get all pending donation requests (with donee name)
async function getPendingDonations() {
  try {
    const result = await pool.query(
      `SELECT dr.*, CONCAT(d.first_name, ' ', d.last_name) AS donee_name FROM donation_requests dr
       LEFT JOIN donees d ON dr.donee_id = d.donee_id
       WHERE dr.status = 'pending' ORDER BY dr.created_at DESC, dr.request_id DESC`
    );
    return { success: true, requests: result.rows };
  } catch {
    return { success: false, message: "Database error" };
  }
}

// Accept a pending donation request
async function acceptDonationRequest(id) {
  try {
    await pool.query(
      `UPDATE donation_requests SET status = 'active' WHERE request_id = $1`,
      [id]
    );
    return { success: true };
  } catch {
    return { success: false, message: "Database error" };
  }
}

// Reject a pending donation request
async function rejectDonationRequest(id) {
  try {
    await pool.query(
      `UPDATE donation_requests SET status = 'rejected' WHERE request_id = $1`,
      [id]
    );
    return { success: true };
  } catch {
    return { success: false, message: "Database error" };
  }
}

// Get a single pending donation request (with donee name)
async function getPendingDonationDetail(id) {
  try {
    const result = await pool.query(
      `SELECT dr.*, CONCAT(d.first_name, ' ', d.last_name) AS donee_name FROM donation_requests dr
       LEFT JOIN donees d ON dr.donee_id = d.donee_id
       WHERE dr.request_id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return { success: false, message: "Donation request not found" };
    }
    return { success: true, donation: result.rows[0] };
  } catch {
    return { success: false, message: "Database error" };
  }
}

// Get donation stats for stat cards
async function getDonationStats() {
  try {
    const result = await pool.query(
      `SELECT status, COUNT(*) as count FROM donation_requests GROUP BY status`
    );
    let stats = { pending: 0, accepted: 0, declined: 0, total: 0 };
    result.rows.forEach((row) => {
      if (row.status === "pending") stats.pending = parseInt(row.count);
      if (row.status === "active") stats.accepted = parseInt(row.count);
      if (row.status === "rejected") stats.declined = parseInt(row.count);
      stats.total += parseInt(row.count);
    });
    return stats;
  } catch {
    return { pending: 0, accepted: 0, declined: 0, total: 0 };
  }
}

export {
  getPendingDonations,
  acceptDonationRequest,
  rejectDonationRequest,
  getPendingDonationDetail,
  getDonationStats,
};
