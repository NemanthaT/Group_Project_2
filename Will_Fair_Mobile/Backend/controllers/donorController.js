// Donor Controller
const bcrypt = require('bcrypt');
const donorModel = require('../models/donorModel');

// Donor login for Will_Fair_Mobile
exports.loginDonor = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
    const result = await donorModel.getDonorByEmail(email);
    if (!result) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, result.password_hash);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Return donor_id and name
    res.status(200).json({ donor_id: result.donor_id, first_name: result.first_name, last_name: result.last_name });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update donor profile (flexible - can update any combination of fields)
// Email cannot be updated
exports.updateDonorProfile = async (req, res) => {
  try {
    const { donor_id } = req.params;
    const { first_name, last_name, password } = req.body;
    
    console.log('=== UPDATE DONOR PROFILE ===');
    console.log('Donor ID:', donor_id);
    console.log('Request body:', req.body);
    console.log('Update data:', { first_name, last_name, password: password ? '***' : 'not provided' });
    
    // Validate donor_id
    if (!donor_id) {
      return res.status(400).json({ success: false, message: 'Donor ID is required' });
    }
    
    // At least one field must be provided for update
    if (!first_name && !last_name && !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'At least one field (first_name, last_name, or password) must be provided' 
      });
    }
    
    // Validate password if provided
    if (password && password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters long' 
      });
    }
    
    // Build update data object (only include provided fields)
    const updateData = {};
    if (first_name !== undefined) updateData.first_name = first_name;
    if (last_name !== undefined) updateData.last_name = last_name;
    if (password) updateData.password = password;
    
    console.log('Calling model with updateData:', updateData);
    
    // Call model to update
    const result = await donorModel.updateDonorProfile(donor_id, updateData);
    
    if (result.success) {
      console.log('Profile updated successfully:', result.donor);
      return res.status(200).json(result);
    } else {
      console.error('Failed to update profile:', result.message);
      return res.status(400).json(result);
    }
  } catch (error) {
    console.error('Error in updateDonorProfile controller:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};

exports.registerDonor = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const donor = await donorModel.createDonor(fullName, email, password);
    res.status(201).json(donor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
