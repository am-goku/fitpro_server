const express = require('express');
const { googleUserLogin } = require('../controllers/oAuthController');
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: O-Auth
 *   description: Google Authentication routes
 */

/**
 * @swagger
 * /api/v1/oauth/g/signin:
 *   post:
 *     summary: Sign in with Google
 *     description: Allows users to sign in using their Google account. If the user does not exist, a new account will be created.
 *     tags:
 *       - O-Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               profilePic:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/profile-pic.jpg"
 *     responses:
 *       200:
 *         description: Successfully logged in or created a new account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d5f3c0c15b2c001c8e4c42"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     profilePic:
 *                       type: string
 *                       example: "https://example.com/profile-pic.jpg"
 *                     isVerified:
 *                       type: boolean
 *                       example: true
 *                     role:
 *                       type: string
 *                       example: "user"
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjEyMzQ1NjAwLCJleHBpcmF0aW9uIjp0cnVlfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *     components:
 *       securitySchemes:
 *         BearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */
router.post('/g/signin', googleUserLogin);


module.exports = router;