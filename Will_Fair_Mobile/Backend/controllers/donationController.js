
// Add donation and update quantity_received (for Will_Fair_Mobile)
exports.addDonationAmountMobile = async (req, res) => {
  try {
    const { request_id, amount, donor_id } = req.body;
    if (!request_id || !amount || !donor_id) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const result = await Donation.addDonationAmount(request_id, amount, donor_id);
    if (result.success) {
      res.status(201).json({ success: true });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (err) {
    console.error('Error in addDonationAmountMobile:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Helper function to find category image
const findCategoryImage = (categoryName) => {
  const fs = require('fs');
  const path = require('path');
  
  if (!categoryName) return null;
  
  const imagesDir = path.join(__dirname, '..', 'uploads', 'images');
  
  try {
    const files = fs.readdirSync(imagesDir);
    
    // First, try exact match after removing spaces
    const normalizedCategory = categoryName.replace(/\s+/g, '').toLowerCase();
    let matchedFile = files.find(file => {
      const fileNameWithoutExt = path.parse(file).name.toLowerCase();
      return fileNameWithoutExt === normalizedCategory;
    });
    
    // If not found, try partial matching (for long category names)
    if (!matchedFile) {
      // Extract key words from category name
      const categoryWords = categoryName.toLowerCase().split(/\s+/);
      
      matchedFile = files.find(file => {
        const fileName = path.parse(file).name.toLowerCase();
        // Check if filename contains main category words
        return categoryWords.some(word => 
          word.length > 3 && fileName.includes(word)
        );
      });
    }
    
    return matchedFile;
  } catch (err) {
    console.error('Error reading images directory:', err);
    return null;
  }
};

const Donation = require('../models/donationModel');

exports.getRecentDonationsMobile = async (req, res) => {
  try {
    const donations = await Donation.getRecentDonations(3); // limit 3 for mobile view
    
    // Build absolute base for image URLs
    const host = `${req.protocol}://${req.get('host')}`;
    
    // Map donations to include full image URLs based on category_name
    const mappedDonations = donations.map(donation => {
      const categoryName = donation.category_name || '';
      const matchedFile = findCategoryImage(categoryName);
      
      const image_url = matchedFile
        ? `${host}/uploads/images/${matchedFile}`
        : '';
      
      console.log(`Category: "${categoryName}" -> Image: ${matchedFile || '(NOT FOUND)'}`);
      
      return {
        ...donation,
        image_url,
        category: donation.category_name
      };
    });
    
    res.status(200).json({ success: true, donations: mappedDonations });
  } catch (err) {
    console.error('Error fetching recent donations:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch recent donations' });
  }
};

// Get all donation requests (for 'View All')
exports.getAllDonationsMobile = async (req, res) => {
  try {
    const donations = await Donation.getAllDonations();
    
    // Build absolute base for image URLs
    const host = `${req.protocol}://${req.get('host')}`;
    
    // Map donations to include full image URLs based on category_name
    const mappedDonations = donations.map(donation => {
      const categoryName = donation.category_name || '';
      const matchedFile = findCategoryImage(categoryName);
      
      const image_url = matchedFile
        ? `${host}/uploads/images/${matchedFile}`
        : '';
      
      return {
        ...donation,
        image_url,
        category: donation.category_name
      };
    });
    
    res.status(200).json({ success: true, donations: mappedDonations });
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
      // Build absolute base for image URLs
      const host = `${req.protocol}://${req.get('host')}`;
      
      const categoryName = request.category || '';
      const matchedFile = findCategoryImage(categoryName);
      
      const image_url = matchedFile
        ? `${host}/uploads/images/${matchedFile}`
        : '';
      
      res.status(200).json({ 
        success: true, 
        request: {
          ...request,
          image_url
        }
      });
    } else {
      console.error(`Request not found for ID: ${requestId}`);
      res.status(404).json({ success: false, error: 'Request not found' });
    }
  } catch (err) {
    console.error('Error fetching donation by ID:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch request', details: err.message });
  }
};

// Get donation requests by donee_id (for My Donation Requests)
exports.getMyDonationRequestsMobile = async (req, res) => {
  try {
    const doneeId = req.params.doneeId;
    if (!doneeId) {
      console.error('No doneeId provided in params');
      return res.status(400).json({ success: false, error: 'No doneeId provided' });
    }
    
    const donations = await Donation.getDonationsByDoneeId(doneeId);
    
    // Build absolute base for image URLs
    const host = `${req.protocol}://${req.get('host')}`;
    
    // Map donations to include full image URLs based on category_name
    const mappedDonations = donations.map(donation => {
      const categoryName = donation.category_name || '';
      const matchedFile = findCategoryImage(categoryName);
      
      const image_url = matchedFile
        ? `${host}/uploads/images/${matchedFile}`
        : '';
      
      return {
        ...donation,
        image_url,
        category: donation.category_name
      };
    });
    
    res.status(200).json({ success: true, donations: mappedDonations });
  } catch (err) {
    console.error('Error fetching donation requests by donee:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch donation requests' });
  }
};
