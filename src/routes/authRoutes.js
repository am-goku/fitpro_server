const express = require('express');
const { registerUser, verifyUserOtp, loginUser, verifyUserEmail, verifyUserPassChangeOTP, changeUserPassword } = require('../controllers/authController');


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user and will send otp
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent to your email
 *       409:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/v1/auth/verify-otp:
 *   post:
 *     summary: Verify OTP for a new user registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Account verified and Token generated
 *       400:
 *         description: OTP expired or invalid
 *       500:
 *         description: Server error
 */
router.post('/verify-otp', verifyUserOtp);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login ( Will return user data and access token )
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: OInvalid credentials
 *       500:
 *         description: Server error
 */
router.post('/login', loginUser);


/**
 * @swagger
 * /api/v1/auth/forgot-password/verify-email:
 *   post:
 *     summary: Verify user email before password change
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent to email successfully
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/forgot-password/verify-email', verifyUserEmail);


/**
 * @swagger
 * /api/v1/auth/forgot-password/verify-otp:
 *   post:
 *     summary: Verify otp that has been sent to the user email before password change
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP has been verified
 *       400:
 *         description: Invalid credentials / Invalid OTP
 *       500:
 *         description: Server error
 */
router.post('/forgot-password/verify-otp', verifyUserPassChangeOTP);


/**
 * @swagger
 * /api/v1/auth/change-password:
 *   patch:
 *     summary: Change password for the user ( note- the server will check for the prevoius otp once again )
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP has been verified and password has been updated
 *       400:
 *         description: Invalid credentials / Invalid OTP
 *       500:
 *         description: Server error
 */
router.patch('/change-password', changeUserPassword);



module.exports = router;
