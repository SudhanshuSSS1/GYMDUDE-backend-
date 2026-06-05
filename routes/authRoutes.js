const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', authController.register);

// @route   GET /api/auth/verify-email/:token
// @desc    Verify user email
router.get('/verify-email/:token', authController.verifyEmail);

// @route   POST /api/auth/login
// @desc    Login user and get token
router.post('/login', authController.login);

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
router.post('/forgot-password', authController.forgotPassword);

// @route   POST /api/auth/reset-password/:token
// @desc    Reset password
router.post('/reset-password/:token', authController.resetPassword);

// @route   POST /api/auth/resend-verification
// @desc    Resend verification email
router.post('/resend-verification', authController.resendVerification);

// @route   POST /api/auth/update-profile
// @desc    Update user profile
router.post('/update-profile', authController.updateProfile);

// @route   POST /api/auth/update-goals
// @desc    Update user goals
router.post('/update-goals', authController.updateGoals);

module.exports = router;
