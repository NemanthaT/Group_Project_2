import pool from "../db.js";

async function registerDonor(fullName, email, password) {
  try {
    // First check if email already exists
    const emailCheck = await pool.query(
      `SELECT donor_id FROM donors WHERE email = $1`,
      [email]
    );

    if (emailCheck.rows.length > 0) {
      return { success: false, message: "Email already exists" };
    }

    // Proceed with registration if email doesn't exist
    const nameParts = fullName.trim().split(" ");
    const first_name = nameParts[0];
    const last_name = nameParts.slice(1).join(" ") || "";

    const result = await pool.query(
      `INSERT INTO donors (first_name, last_name, email, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING donor_id`,
      [first_name, last_name, email, password]
    );

    return { success: true, userId: result.rows[0].donor_id };
  } catch (err) {
    console.error("Database error during registerDonor():", err);
    return { success: false, message: "Database error" };
  }
}

// my edits
// Get total number of donors
async function getTotalDonors() {
  const res = await pool.query('SELECT COUNT(*) AS total FROM donors');
  return Number(res.rows[0].total);
}

// Get all donors with summary info and totalDonations per donor
async function getAllDonors() {
  const res = await pool.query(`
    SELECT d.donor_id, d.first_name, d.last_name, d.email, d.phone,
      COALESCE(SUM(n.amount),0) AS totalDonations
    FROM donors d
    LEFT JOIN donations n ON d.donor_id = n.donor_id
    GROUP BY d.donor_id, d.first_name, d.last_name, d.email, d.phone
    ORDER BY d.donor_id
  `);
  res.rows.forEach(row => {
    row.name = row.first_name + ' ' + row.last_name;
    row.totalDonations = Number(row.totaldonations || row.totalDonations || 0);
  });
  return res.rows;
}

// Get total donation amount (all time)
async function getTotalDonations() {
  const res = await pool.query('SELECT COALESCE(SUM(amount),0) AS total FROM donations');
  return Number(res.rows[0].total);
}

// Get donor stats for admin dashboard
async function getDonorStats() {
  const totalDonors = await getTotalDonors();
  const totalDonations = await getTotalDonations();
  return { totalDonors, totalDonations };
}

// Get donor profile by donor ID
async function getDonorProfileById(donorId) {
  try {
    const res = await pool.query(
      `SELECT donor_id, first_name, last_name, email, phone FROM donors WHERE donor_id = $1`,
      [donorId]
    );
    if (res.rows.length === 0) return null;
    const donor = res.rows[0];
    donor.name = donor.first_name + ' ' + donor.last_name;
    // Get total donations count for this donor
    const donationRes = await pool.query(
      `SELECT COUNT(*) AS total FROM donations WHERE donor_id = $1`,
      [donorId]
    );
    donor.totalDonations = Number(donationRes.rows[0].total);
    return donor;
  } catch (err) {
    console.error('Database error during getDonorProfileById():', err);
    return null;
  }
}

export { registerDonor, getTotalDonors, getAllDonors, getTotalDonations, getDonorStats, getDonorProfileById };

// my edits end