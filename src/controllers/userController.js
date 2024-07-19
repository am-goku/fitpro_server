const { updateProfile, fetchUser } = require("../helpers/userHelper");
const responseHandler = require("../utils/responseHandler");


/**
 * Updates the user's profile information.
 *
 * @param {Object} req - Express request object containing the user's profile data in the body.
 * @param {Object} res - Express response object to send the updated profile data back to the client.
 * @returns {Promise<void>} - Returns a Promise that resolves when the profile is successfully updated.
 * @throws {Error} - Throws an error if there's an issue updating the profile.
 */
async function updateUserProfile(req, res) {
    try {
        const userData = req.body;
        const userID = req.userID;

        delete userData.email;
        delete userData.password;

        const data = await updateProfile(userID, userData);
        return responseHandler(res, data);

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }
        responseHandler(res, data);
    }
}


/**
 * Fetches user data from the database based on the provided user ID.
 *
 * @param {Object} req - Express request object containing the user ID in the params.
 * @param {Object} res - Express response object to send the fetched user data back to the client.
 * @returns {Promise<void>} - Returns a Promise that resolves when the user data is successfully fetched.
 * @throws {Error} - Throws an error if there's an issue fetching the user data.
 */
async function fetchUserData(req, res) {
    try {
        const id = req.query.userID;

        const data = await fetchUser(id);

        return responseHandler(res, data);

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }
        responseHandler(res, data);
    }
}


module.exports = { updateUserProfile, fetchUserData }