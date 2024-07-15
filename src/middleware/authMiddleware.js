const User = require("../models/User");
const { validateToken } = require("../service/jwt");
const responseHandler = require("../utils/responseHandler");


/**
 * @description This middleware function is used to protect user routes.
 * It validates the token, checks if the user is verified and sets the user ID in the request object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} - Resolves when the middleware function is done executing.
 * @throws {Error} - If an error occurs during the execution of the middleware function.
 */
async function userProtect(req, res, next) {
    try {

        const token = req.headers.authorization.split(" ")[1];

        const decoded = validateToken(token);

        if (!decoded) {
            const data = {
                status: 401,
                message: 'Invalid or expired token',
            }
            return responseHandler(res, data);
        }

        const user = await User.findOne({ _id: decoded.id }).select("-password");

        if (!user) {
            const data = {
                status: 400,
                message: 'User not found',
            }
            return responseHandler(res, data);
        }

        if (!user.isVerified) {
            const data = {
                status: 403,
                message: 'Account is not verified',
            }
            return responseHandler(res, data);
        }

        req.userID = user._id;

        next();

    } catch (error) {

        const data = {
            status: 500,
            message: error.message,
        }

        responseHandler(res, data)
    }
}


module.exports = { userProtect }