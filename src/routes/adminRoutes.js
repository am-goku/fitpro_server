/**
 * Router for handling admin login requests.
 *
 * @module routers/adminAuthRouter
 * @requires express
 * @requires controllers/authController
 */

const express = require('express');
const { loginAdmin } = require('../controllers/authController');

/**
 * Express router instance for admin authentication.
 *
 * @type {express.Router}
 */
const router = express.Router();

/**
 * POST request handler for admin login.
 *
 * This function is responsible for handling admin login requests. It expects
 * a JSON body with 'username' and 'password' fields. Upon successful login,
 * it returns a JSON object with a 'token' field containing the JWT token.
 *
 * @name post/login
 * @function
 * @memberof module:routers/adminAuthRouter
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 * @returns {express.Response} - Express response object with JSON body.
 * @returns {express.Response.json} - JSON response with 'token' field if successful.
 * @returns {express.Response.status} - Status 401 if login fails.
 */
router.post('/login', loginAdmin);

module.exports = router;