import pool from "../db.js";

async function createMonetoryDonation(donationData) {
  try {
    const result = await pool.query(
      `INSERT INTO donations (donee_id, amount, status)
       VALUES ($1, $2, $3)
       RETURNING donation_id`,
      [donationData.doneeId, donationData.amount, donationData.status]
    );
    return { success: true, donationId: result.rows[0].donation_id };
  } catch (err) {
    console.error("Database error during createDonation():", err);
    return { success: false, message: "Database error" };
  }
}

async function getDonationsByDoneeId(doneeId) {
  try {
    const result = await pool.query(
      `SELECT * FROM donations WHERE donee_id = $1`,
      [doneeId]
    );
    return { success: true, donations: result.rows };
  } catch (err) {
    console.error("Database error during getDonationsByDoneeId():", err);
    return { success: false, message: "Database error" };
  }
}

async function getDonationCategories() {
  try {
    const results = await pool.query(
      `SELECT DISTINCT category FROM donation_categories`
    );
    return {
      success: true,
      categories: results.rows.map((row) => row.category),
    };
  } catch (err) {
    console.error("Database error during getDonationCategories():", err);
    return { success: false, message: "Database error" };
  }
}

export { createMonetoryDonation, getDonationsByDoneeId , getDonationCategories };
