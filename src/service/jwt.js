const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Generates a JSON Web Token (JWT) for the given user ID and role.
 *
 * @param {number} id - The unique identifier of the user.
 * @param {string} [role='user'] - The role of the user. Defaults to 'user' if not provided.
 *
 * @returns {string} - A JSON Web Token string representing the user's identity and role.
 *                        The token is signed using the JWT_SECRET environment variable.
 *                        The token expires in 30 days.
 */
function generateToken(id, role = 'user') {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

/**
 * Validates a JSON Web Token (JWT) and returns the decoded payload.
 *
 * @param {string} token - The JWT string to be validated.
 * @returns {Object|null} - The decoded payload of the JWT, or null if the token is invalid or expired.
 *                                 The payload contains the user's unique identifier (id) and role.
 *
 * @throws {Error} - If the JWT_SECRET environment variable is not set.
 */
function validateToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}

module.exports = { generateToken, validateToken };