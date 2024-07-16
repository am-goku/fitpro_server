const dotenv = require('dotenv');
const { createTransport } = require('nodemailer');

dotenv.config();


/**
 * Sends an OTP (One-Time Password) email to the specified email address.
 *
 * @param {string} email - The recipient's email address.
 * @param {string} otp - The one-time password to be sent in the email.
 *
 * @returns {Promise<void>} - A Promise that resolves when the email is successfully sent.
 */
async function sendOtpEmail(email, otp) {
    const transporter = createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const mailOptions = {
        from: 'no-reply@example.com',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is ${otp}. Please use this OTP to verify your email address. The OTP is only valid for 10 minutes.`,
    }

    await transporter.sendMail(mailOptions);
}

module.exports = sendOtpEmail;