import {
  createMonetoryDonation,
  createNonMonetoryDonation,
  getDonationsByDoneeId,
  getMonetaryDonationCategories,
  getNonMonetaryDonationCategories,
  getDonationById,
  updateDonationById,
  deleteDonationById
} from "../models/donationModel.js";

// Controller for creating a monetary donation
export const createMonDonation = async (req, res) => {
  const { doneeId, category, targetAmount, description, requestName, urgentDate } = req.body;
  const image = req.files?.image?.[0];
  const documents = req.files?.documents;

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
      imagePath: image?.path,
      documentPaths: documents,
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
      imagePath: image?.path,
      documentPaths: documents?.map(doc => doc.path),
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
  } catch (err) {
    console.error("Error in getDoneeDonations:", err);
    res.status(500).json({
      success: false,
      error: "Server error while fetching donations"
    });
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
  } catch (error) {
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
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error while deleting donation' });
  }
};