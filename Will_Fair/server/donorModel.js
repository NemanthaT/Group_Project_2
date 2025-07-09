// donorModel.js
const pool = require("./db");

async function registerDonor(fullName, email, password) {
  try {
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

    if (err.code === '23505') {
      // PostgreSQL duplicate key error
      return { success: false, message: "Email already exists" };
    }

    return { success: false, message: "Database error" };
  }
}

module.exports = {
  registerDonor,
};
