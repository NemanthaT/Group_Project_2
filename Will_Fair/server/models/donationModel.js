import pool from "../db.js";

async function createMonetoryDonation(donationData) {
  try {
    const result = await pool.query(
      `INSERT INTO donation_requests (
        donee_id, 
        quantity_needed, 
        title, 
        due_date,  
        status
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING request_id`,
      [
        donationData.doneeId,
        donationData.targetAmount,
        donationData.requestName,
        donationData.urgentDate,
        donationData.status
      ]
    );
    return { success: true, donationId: result.rows[0].request_id };
  } catch (err) {
    console.error("Database error during createMonetoryDonation():", err);
    return { success: false, message: "Database error" };
  }
}

async function createNonMonetoryDonation(donationData) {
  try {
    const result = await pool.query(
      `INSERT INTO donation_requests (
        donee_id, 
        category, 
        request_name, 
        item_name, 
        item_quantity, 
        dropoff_date, 
        image_path, 
        document_paths, 
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING request_id`,
      [
        donationData.doneeId,
        donationData.category,
        donationData.requestName,
        donationData.itemName,
        donationData.itemQuantity,
        donationData.dropoffDate,
        donationData.imagePath,
        donationData.documentPaths,
        donationData.status
      ]
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
    console.error("Database error during getMonetaryDonationCategories():", err);
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

export { 
  createMonetoryDonation, 
  createNonMonetoryDonation, 
  getDonationsByDoneeId, 
  getMonetaryDonationCategories, 
  getNonMonetaryDonationCategories 
};