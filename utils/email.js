const { Resend } = require('resend');
require('dotenv').config();

const resendApiKey = process.env.RESEND_API_KEY || 're_123';
if (!process.env.RESEND_API_KEY) {
  console.warn('[Email] Warning: RESEND_API_KEY is not set in environment variables. Using a dummy key. Email sending will fail.');
}
const resend = new Resend(resendApiKey);

const sendVerificationEmail = async (email, token) => {
  const baseUrl = process.env.RENDER_EXTERNAL_URL || process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
  console.log(`[Email] Base URL evaluated as: ${baseUrl}`);
  const verificationUrl = `${baseUrl}/api/auth/verify-email/${token}`;
  
  try {
    const { data, error } = await resend.emails.send({
      // If you don't have a verified domain on Resend, you must use onboarding@resend.dev as the 'from' address
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: email,
      subject: 'Email Verification',
      html: `
        <h1>Verify Your Email</h1>
        <p>Please click the link below to verify your email address:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
      `,
    });

    if (error) {
      console.error(`[Email] Resend API Error for ${email}:`, error);
      throw error;
    }

    console.log(`[Email] Verification email sent successfully to ${email}. ID: ${data.id}`);
  } catch (error) {
    console.error(`[Email] Failed to send verification email to ${email}:`, error);
    throw error;
  }
};

const sendPasswordResetEmail = async (email, token) => {
  const baseUrl = process.env.RENDER_EXTERNAL_URL || process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
  console.log(`[Email] Base URL evaluated as: ${baseUrl}`);
  const resetUrl = `${baseUrl}/api/auth/reset-password/${token}`;
  
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: email,
      subject: 'Password Reset',
      html: `
        <h1>Reset Your Password</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>If you didn't request this, you can safely ignore this email.</p>
      `,
    });

    if (error) {
      console.error(`[Email] Resend API Error for ${email}:`, error);
      throw error;
    }

    console.log(`[Email] Password reset email sent successfully to ${email}. ID: ${data.id}`);
  } catch (error) {
    console.error(`[Email] Failed to send password reset email to ${email}:`, error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
