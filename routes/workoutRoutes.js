const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');

// @route   POST /api/log-workout
// @desc    Log a workout session
router.post('/log-workout', workoutController.logWorkout);

// @route   GET /api/daily-workout/:email/:date
// @desc    Get daily workout logs
router.get('/daily-workout/:email/:date', workoutController.getDailyWorkout);

module.exports = router;
