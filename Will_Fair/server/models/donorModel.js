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


export { registerDonor };