import pool from "../db.js";

async function createMonetoryDonation(donationData) {
  try {
    const result = await pool.query(
      `INSERT INTO donation_requests (donee_id, quantity_needed, status)
       VALUES ($1, $2, $3)
       RETURNING request_id`,
      [donationData.doneeId, donationData.targetAmount, donationData.status]
    );
    return { success: true, donationId: result.rows[0].request_id };
  } catch (err) {
    console.error("Database error during createDonation():", err);
    return { success: false, message: "Database error" };
  }
}

async function createNonMonetoryDonation(donationData) {
  try {
    const result = await pool.query(
      `INSERT INTO donation_requests (donee_id, category, status)
       VALUES ($1, $2, $3)
       RETURNING request_id`,
      [donationData.doneeId, donationData.category, donationData.status]
    );
    return { success: true, donationId: result.rows[0].request_id };
  } catch (err) {
    console.error("Database error during createNonMonetoryDonation():", err);
    return { success: false, message: "Database error" };
  }
}

async function getDonationsByDoneeId(doneeId) {
  try {
    const result = await pool.query(
      `SELECT * FROM donation_requests WHERE donee_id = $1`,
      [doneeId]
    );
    return { success: true, donations: result.rows };
  } catch (err) {
    console.error("Database error during getDonationsByDoneeId():", err);
    return { success: false, message: "Database error" };
  }
}

async function getMonetaryDonationCategories() {
  try {
    const results = await pool.query(
      `SELECT category_name FROM donation_categories WHERE is_monetary = true`
    );
    return {
      success: true,
      categories: results.rows.map((row) => row.category_name)
    };
  } catch (err) {
    console.error("Database error during getDonationCategories():", err);
    return { success: false, message: "Database error" };
  }
}

async function getNonMonetaryDonationCategories() {
  try {
    const results = await pool.query(
      `SELECT category_name FROM donation_categories WHERE is_monetary = false`
    );
    return {
      success: true,
      categories: results.rows.map((row) => row.category_name)
    };
  } catch (err) {
    console.error("Database error during getNonMonetaryDonationCategories():", err);
    return { success: false, message: "Database error" };
  }
}

export { createMonetoryDonation, createNonMonetoryDonation, getDonationsByDoneeId , getMonetaryDonationCategories, getNonMonetaryDonationCategories };