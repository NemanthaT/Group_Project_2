// donationController.js
import {
  createMonetoryDonation,
  createNonMonetoryDonation,
  getDonationsByDoneeId,
  getMonetaryDonationCategories,
  getNonMonetaryDonationCategories
} from "../models/donationModel.js";

// Controller for creating a monetary donation
export const createMonDonation = async (req, res) => {
  const { doneeId, targetAmount, status } = req.body;

  if (!doneeId || !targetAmount) {
    return res.status(400).json({
      success: false,
      error: "Donee ID and target amount are required"
    });
  }

  try {
    const result = await createMonetoryDonation({
      doneeId,
      targetAmount,
      status: status || 'pending'
    });

    if (result.success) {
      res.status(201).json({
        success: true,
        message: "Donation created successfully",
        donationId: result.donationId
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.message
      });
    }
  } catch (err) {
    console.error("Error in createDonation:", err);
    res.status(500).json({
      success: false,
      error: "Server error during donation creation"
    });
  }
};

// Controller for creating a non-monetary donation
export const createNonMonDonation = async (req, res) => {
  const { doneeId, category, status } = req.body;

  if (!doneeId || !category) {
    return res.status(400).json({
      success: false,
      error: "Donee ID and category are required"
    });
  }

  try {
    const result = await createNonMonetoryDonation({
      doneeId,
      category,
      status: status || 'pending'
    });

    if (result.success) {
      res.status(201).json({
        success: true,
        message: "Non-Monetary Donation created successfully",
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
  const { doneeId } = req.params;

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
      });
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
    console.error("Error in getCategories:", err);
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