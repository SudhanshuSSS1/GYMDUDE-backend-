const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

// @route   GET /api/progress/:email
// @desc    Get progress dashboard data
router.get('/progress/:email', progressController.getProgressData);

module.exports = router;
