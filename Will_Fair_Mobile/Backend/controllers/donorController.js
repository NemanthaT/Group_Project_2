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
