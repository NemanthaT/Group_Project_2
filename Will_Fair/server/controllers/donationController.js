// donationController.js
import {
  createMonetoryDonation,
  getDonationsByDoneeId,
  getDonationCategories
} from "../models/donationModel.js";

export const createDonation = async (req, res) => {
  const { doneeId, amount, status } = req.body;

  if (!doneeId || !amount) {
    return res.status(400).json({ 
      success: false,
      error: "Donee ID and amount are required" 
    });
  }

  try {
    const result = await createMonetoryDonation({
      doneeId,
      amount,
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

export const getCategories = async (req, res) => {
  try {
    const result = await getDonationCategories();

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