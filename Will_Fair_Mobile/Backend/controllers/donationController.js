const Donation = require('../models/donationModel');

exports.getRecentDonationsMobile = async (req, res) => {
  try {
    const donations = await Donation.getRecentDonations(3); // limit 3 for mobile view
    res.status(200).json({ success: true, donations });
  } catch (err) {
    console.error('Error fetching recent donations:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch recent donations' });
  }
};

// Get all donation requests (for 'View All')
exports.getAllDonationsMobile = async (req, res) => {
  try {
    const donations = await Donation.getAllDonations();
    res.status(200).json({ success: true, donations });
  } catch (err) {
    console.error('Error fetching all donations:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch all donations' });
  }
};
