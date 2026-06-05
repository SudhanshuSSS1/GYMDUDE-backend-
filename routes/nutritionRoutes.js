const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutritionController');

// @route   GET /api/nutrition
// @desc    Search food nutrition database
router.get('/nutrition', nutritionController.searchNutrition);

// @route   POST /api/log-food
// @desc    Log eaten food
router.post('/log-food', nutritionController.logFood);

// @route   GET /api/daily-nutrition/:email/:date
// @desc    Get daily nutrition summary
router.get('/daily-nutrition/:email/:date', nutritionController.getDailyNutrition);

module.exports = router;
