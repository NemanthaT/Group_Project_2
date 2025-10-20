// Category Controller
const categoryModel = require('../models/categoryModel');

exports.getMonetaryCategories = async (req, res) => {
  try {
    const categories = await categoryModel.getMonetaryCategories();
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getNonMonetaryCategories = async (req, res) => {
  try {
    const categories = await categoryModel.getNonMonetaryCategories();
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.getAllCategories();
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
