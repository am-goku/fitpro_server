const express = require('express');
const { googleUserSignup, googleUserLogin } = require('../controllers/oAuthController');
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: O-Auth
 *   description: Google Authentication routes
 */

/**
 * @swagger
 * /api/v1/oauth/g/signup:
 *   post:
 *     summary: Register a new user with Google OAuth
 *     tags: [O-Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - profilePic
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               profilePic:
 *                 type: string
 *     responses:
 *       200:
 *         description: Account successfully registered
 *       409:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
router.post('/g/signup', googleUserSignup);

/**
 * @swagger
 * /api/v1/oauth/g/signin:
 *   post:
 *     summary: Login a user with Google OAuth
 *     tags: [O-Auth]
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
 *         description: Account logged in successfully
 *       400:
 *         description: User does not exist
 *       500:
 *         description: Server error
 */
router.post('/g/signin', googleUserLogin);









module.exports = router;