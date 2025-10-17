import {
  createMonetoryDonation,
  createNonMonetoryDonation,
  getDonationsByDoneeId,
  getMonetaryDonationCategories,
  getNonMonetaryDonationCategories,
  deleteDonationById,
  getRecentDonations,
  getDonationById,
  getDonationsForReg
} from "../models/donationModel.js";

// Controller for creating a monetary donation
export const createMonDonation = async (req, res) => {
  const { doneeId, category, targetAmount, description, requestName, urgentDate } = req.body;
  const image = req.files?.image?.[0];
  const documents = req.files?.documents;
  console.log("Docs: ", documents);

  if (!doneeId || !targetAmount || !requestName) {
    return res.status(400).json({
      success: false,
      error: "Donee ID, target amount, and request name are required"
    });
  }

  try {
    const result = await createMonetoryDonation({
      doneeId,
      category,
      targetAmount,
      requestName,
      description,
      urgentDate,
      imagePath: image, // pass multer file object so model can move file
      documentPaths: documents, // pass array of multer file objects
      status: 'pending'
    });

    if (result.success) {
      res.status(201).json({
        success: true,
        message: "Monetary donation created successfully",
        donationId: result.donationId
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.message
      });
    }
  } catch (err) {
    console.error("Error in createMonDonation:", err);
    res.status(500).json({
      success: false,
      error: "Server error during donation creation"
    });
  }
};

// Controller for creating a non-monetary donation
export const createNonMonDonation = async (req, res) => {
  const { doneeId, category, requestName, itemName, itemQuantity, dropoffDate } = req.body;
  const image = req.files?.image?.[0];
  const documents = req.files?.documents;

  if (!doneeId || !category || !requestName || !itemName || !itemQuantity) {
    return res.status(400).json({
      success: false,
      error: "Donee ID, category, request name, item name, and quantity are required"
    });
  }

  try {
    const result = await createNonMonetoryDonation({
      doneeId,
      category,
      requestName,
      itemName,
      itemQuantity,
      dropoffDate,
      imagePath: image, // multer file object
      documentPaths: documents, // array of multer file objects (or undefined)
      status: 'pending'
    });

    if (result.success) {
      res.status(201).json({
        success: true,
        message: "Non-monetary donation created successfully",
        donationId: result.donationId
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.message
      });
    }
  } catch (err) {
    console.error("Error in createNonMonDonation:", err);
    res.status(500).json({
      success: false,
      error: "Server error during non-monetary donation creation"
    });
  }
};

// Controller for getting donations by donee ID
export const getDoneeDonations = async (req, res) => {
  const { doneeId } = req.body;
  console.log("Fetching donations for donee ID:", doneeId);

  if (!doneeId) {
    return res.status(400).json({
      success: false,
      error: "Donee ID is required"
    });
  }

  try {
    const result = await getDonationsByDoneeId(doneeId);

    if (result.success) {
      res.status(200).json({
        success: true,
        donations: result.donations
      })
      console.log("Donations fetched successfully:", result.donations);
    } else {
      res.status(400).json({
        success: false,
        error: result.message
      });
    }
  } catch {
    res.status(500).json({ success: false, error: 'Server error while fetching donations' });
  }
};

// Controller for getting all donation requests for a donee
export const getDonationsByDonee = async (req, res) => {
  const { doneeId } = req.body;
  if (!doneeId) {
    return res.status(400).json({ success: false, error: 'Donee ID is required' });
  }
  try {
    const result = await getDonationsByDoneeId(doneeId);
    if (result.success) {
      res.status(200).json({ success: true, donations: result.donations });
    } else {
      res.status(400).json({ success: false, error: result.message });
    }
  } catch {
    res.status(500).json({ success: false, error: 'Server error while fetching donations' });
  }
};

// Controller for getting monetary donation categories
export const getMonetaryCategories = async (req, res) => {
  try {
    const result = await getMonetaryDonationCategories();

    if (result.success) {
      res.status(200).json({
        success: true,
        categories: result.categories
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.message
      });
    }
  } catch (err) {
    console.error("Error in getMonetaryCategories:", err);
    res.status(500).json({
      success: false,
      error: "Server error while fetching categories"
    });
  }
};

// Controller for getting non-monetary donation categories
export const getNonMonetaryCategories = async (req, res) => {
  try {
    const result = await getNonMonetaryDonationCategories();

    if (result.success) {
      res.status(200).json({
        success: true,
        categories: result.categories
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.message
      });
    }
  } catch (err) {
    console.error("Error in getNonMonetaryCategories:", err);
    res.status(500).json({
      success: false,
      error: "Server error while fetching non-monetary categories"
    });
  }
};

// Add controller for deleting a donation
export const deleteDonation = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteDonationById(id);
    if (result.success) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, error: result.message });
    }
  } catch {
    res.status(500).json({ success: false, error: 'Server error while deleting donation' });
  }
};

// Controller for getting recent donations
export const getRecentDonationsController = async (req, res) => {
  try {
    const result = await getRecentDonations();
    if (result.success) {
      res.status(200).json({ success: true, donations: result.donations });
    } else {
      res.status(400).json({ success: false, error: result.message });
    }
  } catch {
    res.status(500).json({ success: false, error: 'Server error while fetching recent donations' });
  }
};

// Controller for getting active donations with pagination
export const getActiveDonationsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    
    const result = await import('../models/donationModel.js').then(m => m.getActiveDonations(page, limit));
    if (result.success) {
      res.status(200).json({ 
        success: true, 
        donations: result.donations,
        pagination: result.pagination
      });
    } else {
      res.status(400).json({ success: false, error: result.message });
    }
  } catch (err) {
    console.error("Error in getActiveDonationsController:", err);
    res.status(500).json({ success: false, error: 'Server error while fetching active donations' });
  }
};

// New controller to provide donation stats for HeroSection
export const getDonationStatsController = async (req, res) => {
  try {
    const result = await import('../models/donationModel.js').then(m => m.getDonationStats());
    if (result.success) {
      res.status(200).json({ success: true, stats: result.stats });
    } else {
      res.status(400).json({ success: false, error: result.message });
    }
  } catch (err) {
    console.error('Error in getDonationStatsController:', err);
    res.status(500).json({ success: false, error: 'Server error while fetching stats' });
  }
};

export const getDonationByIdController = async (req, res) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({
      success: false,
      error: "Donation ID is required"
    });
  }

  try {
    const result = await getDonationById(id);
    
    if (result.success) {
      res.status(200).json({
        success: true,
        donation: result.donation,
        recentDonations: result.recentDonations || [] 
      });
    } else {
      res.status(404).json({
        success: false,
        error: result.message
      });
    }
  } catch (err) {
    console.error("Error in getDonationByIdController:", err);
    res.status(500).json({
      success: false,
      error: "Server error while fetching donation details"
    });
  }
};

export const getDonationsForRegController = async (req, res) => {
  const { type } = req.query;

  if (!type || (type !== 'monetary' && type !== 'nonMonetary')) {
    return res.status(400).json({
      success: false,
      error: 'Invalid or missing donation type',
    });
  }

  try {
    const result = await getDonationsForReg(type);

    if (result.success) {
      res.status(200).json({ success: true, donations: result.donations });
    } else {
      res.status(404).json({ success: false, error: result.message });
    }
  } catch (err) {
    console.error('Error in getDonationsByType:', err);
    res.status(500).json({ success: false, error: 'Server error while fetching donations' });
  }
};
