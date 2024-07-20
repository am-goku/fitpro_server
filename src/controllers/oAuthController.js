const { googleLogin } = require("../helpers/oAuthHelper");
const responseHandler = require("../utils/responseHandler");


/**
 * This function handles the login process for an existing user using Google OAuth.
 * It takes the user's email from the request body,
 * and then calls the `googleLogin` function to authenticate the user.
 * If successful, it returns the user data wrapped in a response handler.
 * If an error occurs during the process, it returns an error response with a status of 500.
 *
 * @param {Object} req - Express request object containing the user's email.
 * @param {Object} res - Express response object to send the response back to the client.
 * @returns {Promise<Object>} - A promise that resolves to the user data wrapped in a response handler, or an error response with a status of 500.
 */
async function googleUserLogin(req, res) {
    try {
        const body = req.body;

        const data = await googleLogin(body);

        return responseHandler(res, data);

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }
        responseHandler(res, data);
    }
}

module.exports = { googleUserLogin }