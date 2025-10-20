// Guest User Model
const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Create new guest user
exports.createGuestUser = async (username, email, phone, password) => {
  try {
    // Check if email already exists
    const existingEmail = await pool.query(
      'SELECT email FROM guestusers WHERE email = $1', 
      [email.toLowerCase()]
    );
    if (existingEmail.rows.length > 0) {
      throw new Error('Email already registered');
    }

    // Check if username already exists
    const existingUsername = await pool.query(
      'SELECT username FROM guestusers WHERE username = $1', 
      [username.toLowerCase()]
    );
    if (existingUsername.rows.length > 0) {
      throw new Error('Username already taken');
    }

    // Check if phone already exists
    const existingPhone = await pool.query(
      'SELECT phone FROM guestusers WHERE phone = $1', 
      [phone]
    );
    if (existingPhone.rows.length > 0) {
      throw new Error('Phone number already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new guest user
    const result = await pool.query(
      'INSERT INTO guestusers (email, password_hash, username, phone) VALUES ($1, $2, $3, $4) RETURNING guestuser_id, username, email',
      [email.toLowerCase(), hashedPassword, username.toLowerCase(), phone]
    );

    return { 
      message: 'Guest user created successfully', 
      guestUserId: result.rows[0].guestuser_id,
      username: result.rows[0].username,
      email: result.rows[0].email
    };
  } catch (error) {
    throw error;
  }
};

// Get guest user by email for login
exports.getGuestUserByEmail = async (email) => {
  try {
    const result = await pool.query(
      'SELECT guestuser_id, email, password_hash, username, phone FROM guestusers WHERE email = $1', 
      [email.toLowerCase()]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};
