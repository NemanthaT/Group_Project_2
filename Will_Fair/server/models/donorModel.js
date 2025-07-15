import pool from "../db.js";

async function registerDonor(fullName, email, hashedPassword) {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: "Invalid email format" };
    }

    // Check if email already exists
    const existingUser = await pool.query(
      "SELECT email FROM donors WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return { success: false, message: "Email already exists" };
    }

    // Process name
    const nameParts = fullName.trim().split(" ");
    const first_name = nameParts[0];
    const last_name = nameParts.slice(1).join(" ") || "";

    // Insert new donor with hashed password
    const result = await pool.query(
      `INSERT INTO donors (first_name, last_name, email, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING donor_id`,
      [first_name, last_name, email, hashedPassword]
    );

    return { 
      success: true, 
      userId: result.rows[0].donor_id,
      message: "Registration successful" 
    };
  } catch (err) {
    console.error("Database error during registerDonor():", err);
    
    // Handle specific database errors
    if (err.code === '23505') {
      return { success: false, message: "Email already exists" };
    }
    
    return { 
      success: false, 
      message: "Database error during registration" 
    };
  }
}

export { registerDonor };