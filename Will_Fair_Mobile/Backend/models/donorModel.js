// Donor Model
const pool = require('../config/db');
const bcrypt = require('bcrypt');

exports.createDonor = async (fullName, email, password) => {
  const nameParts = fullName.trim().split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ') || '';
  const existingUser = await pool.query('SELECT email FROM donors WHERE email = $1', [email.toLowerCase()]);
  if (existingUser.rows.length > 0) {
    throw new Error('Email already registered');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO donors (email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING donor_id',
    [email.toLowerCase(), hashedPassword, firstName, lastName]
  );
  return { message: 'Donor created successfully', donorId: result.rows[0].donor_id };
};
