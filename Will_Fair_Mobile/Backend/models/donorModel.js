
// Get donor by email for login
exports.getDonorByEmail = async (email) => {
  const result = await pool.query('SELECT donor_id, email, password_hash, first_name, last_name FROM donors WHERE email = $1', [email.toLowerCase()]);
  return result.rows[0];
};

// Update donor profile (flexible - can update any combination of fields)
// Email cannot be updated
exports.updateDonorProfile = async (donorId, updateData) => {
  try {
    const { first_name, last_name, password } = updateData;
    
    // Build dynamic query based on which fields are being updated
    const updates = [];
    const params = [];
    let paramIndex = 1;
    
    // Add first_name to update if provided
    if (first_name !== undefined && first_name !== null) {
      updates.push(`first_name = $${paramIndex}`);
      params.push(first_name);
      paramIndex++;
    }
    
    // Add last_name to update if provided
    if (last_name !== undefined && last_name !== null) {
      updates.push(`last_name = $${paramIndex}`);
      params.push(last_name);
      paramIndex++;
    }
    
    // Add password to update if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push(`password_hash = $${paramIndex}`);
      params.push(hashedPassword);
      paramIndex++;
    }
    
    // If no fields to update, return error
    if (updates.length === 0) {
      return { success: false, message: 'No fields to update' };
    }
    
    // Add donor_id as the last parameter
    params.push(donorId);
    
    // Build the query
    const query = `
      UPDATE donors 
      SET ${updates.join(', ')}
      WHERE donor_id = $${paramIndex}
      RETURNING donor_id, email, first_name, last_name
    `;
    
    console.log('Update query:', query);
    console.log('Query params:', params);
    
    const result = await pool.query(query, params);
    
    if (result.rows.length === 0) {
      return { success: false, message: 'Donor not found' };
    }
    
    return { 
      success: true, 
      message: 'Profile updated successfully',
      donor: result.rows[0]
    };
  } catch (error) {
    console.error('Error updating donor profile:', error);
    return { 
      success: false, 
      message: 'Failed to update profile: ' + error.message 
    };
  }
};
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
