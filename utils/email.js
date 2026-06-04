const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendVerificationEmail = async (email, token) => {
  const baseUrl = process.env.RENDER_EXTERNAL_URL || process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
  console.log(`[Email] Base URL evaluated as: ${baseUrl}`);
  const verificationUrl = `${baseUrl}/api/auth/verify-email/${token}`;
  
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Email Verification',
    html: `
      <h1>Verify Your Email</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[Email] Verification email sent successfully to ${email}`);
  } catch (error) {
    console.error(`[Email] Failed to send verification email to ${email}:`, error);
    throw error;
  }
};

const sendPasswordResetEmail = async (email, token) => {
  const baseUrl = process.env.RENDER_EXTERNAL_URL || process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
  console.log(`[Email] Base URL evaluated as: ${baseUrl}`);
  const resetUrl = `${baseUrl}/api/auth/reset-password/${token}`;
  
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Password Reset',
    html: `
      <h1>Reset Your Password</h1>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[Email] Password reset email sent successfully to ${email}`);
  } catch (error) {
    console.error(`[Email] Failed to send password reset email to ${email}:`, error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
