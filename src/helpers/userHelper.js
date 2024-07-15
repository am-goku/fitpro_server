const User = require("../models/User");


/**
 * Updates a user's profile information in the database.
 *
 * @param {string} userID - The unique identifier of the user to be updated.
 * @param {object} userData - An object containing the updated profile information.
 * @returns {Promise<{status: number, user: User}>} - A promise that resolves to an object containing the updated user's profile information and a status code.
 * @throws {Error} - If the user is not found in the database.
 */
async function updateProfile(userID, userData) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: userID },
            { $set: userData },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            throw new Error("User not found");
        }

        return { status: 200, user }

    } catch (error) {
        return Promise.reject({ status: 500, message: error.message });
    }
}


module.exports = { updateProfile }