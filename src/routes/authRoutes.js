/**
 * This module defines the routes for the authentication-related API endpoints.
 * It uses Express Router to handle HTTP requests and maps them to the corresponding controller functions.
 *
 * @module authRoutes
 * @requires express
 * @requires ../controllers/authController
 */

const express = require('express');
const { registerUser, verifyUserOtp, loginUser, verifyUserEmail, verifyUserPassChangeOTP, changeUserPassword, sendNewOTP } = require('../controllers/authController');

/**
 * Express Router instance for handling authentication routes.
 *
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Registers a new user.
 *
 * @name POST /register
 * @function
 * @memberof module:authRoutes
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {void}
 */
router.post('/register', registerUser);

/**
 * Sends a new OTP to the user's registered email.
 *
 * @name POST /send-otp
 * @function
 * @memberof module:authRoutes
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {void}
 */
router.post('/send-otp', sendNewOTP);

/**
 * Verifies the user's OTP.
 *
 * @name POST /verify-otp
 * @function
 * @memberof module:authRoutes
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {void}
 */
router.post('/verify-otp', verifyUserOtp);

/**
 * Authenticates the user with their email and password.
 *
 * @name POST /login
 * @function
 * @memberof module:authRoutes
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {void}
 */
router.post('/login', loginUser);

/**
 * Verifies the user's email for password reset.
 *
 * @name POST /forgot-password/verify-email
 * @function
 * @memberof module:authRoutes
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {void}
 */
router.post('/forgot-password/verify-email', verifyUserEmail);

/**
 * Verifies the user's OTP for password reset.
 *
 * @name POST /forgot-password/verify-otp
 * @function
 * @memberof module:authRoutes
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {void}
 */
router.post('/forgot-password/verify-otp', verifyUserPassChangeOTP);

/**
 * Changes the user's password.
 *
 * @name PATCH /change-password
 * @function
 * @memberof module:authRoutes
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {void}
 */
router.patch('/change-password', changeUserPassword);

/**
 * Exports the Express Router instance.
 *
 * @type {express.Router}
 */
module.exports = router;