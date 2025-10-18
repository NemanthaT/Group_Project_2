// Donor login for Will_Fair_Mobile
const bcrypt = require('bcrypt');
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
// Donor Controller
const donorModel = require('../models/donorModel');

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
