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

// Get single donation request by ID (for details page)
exports.getDonationByIdMobile = async (req, res) => {
  try {
    const requestId = req.params.id;
    if (!requestId) {
      console.error('No requestId provided in params');
      return res.status(400).json({ success: false, error: 'No requestId provided' });
    }
    const request = await Donation.getDonationById(requestId);
    if (request) {
      res.status(200).json({ success: true, request });
    } else {
      console.error(`Request not found for ID: ${requestId}`);
      res.status(404).json({ success: false, error: 'Request not found' });
    }
  } catch (err) {
    console.error('Error fetching donation by ID:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch request', details: err.message });
  }
};
