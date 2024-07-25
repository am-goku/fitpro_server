/**
 * Router for handling Google OAuth login.
 *
 * @module routers/googleAuthRouter
 * @requires express
 * @requires controllers/oAuthController
 */

const express = require('express');
const { googleUserLogin } = require('../controllers/oAuthController');
const router = express.Router();

/**
 * Route for handling Google OAuth login.
 *
 * @name post/g/signin
 * @function
 * @memberof module:routers/googleAuthRouter
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {void}
 */
router.post('/g/signin', googleUserLogin);

module.exports = router;