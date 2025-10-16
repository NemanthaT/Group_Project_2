// Category Routes
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/donations/monetaryCategories', categoryController.getMonetaryCategories);
router.get('/donations/nonMonetaryCategories', categoryController.getNonMonetaryCategories);
router.get('/donations/categories', categoryController.getAllCategories);

module.exports = router;
