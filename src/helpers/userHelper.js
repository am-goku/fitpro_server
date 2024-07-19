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


/**
 * Fetches a user's profile information from the database.
 *
 * @param {string} id - The unique identifier of the user to be fetched. If not provided, all users will be fetched.
 * @returns {Promise<{status: number, message: string, users?: User[], user?: User}>} - A promise that resolves to an object containing the fetched user's profile information, a status code, and a message.
 * If no ID is provided, the promise resolves to an object containing an array of all users.
 * If an ID is provided, the promise resolves to an object containing a single user.
 * @throws {Error} - If the user is not found in the database.
 */
async function fetchUser(id) {
    try {
        if (!id) {
            const users = await User.find({}).select("-password");
            return { status: 200, message: "Users has been fetched", users }
        }

        const user = await User.findById(id).select("-password");

        if (!user) {
            return { status: 404, message: "User not found" }
        }

        return { status: 200, message: "User fetched successfullly", user }

    } catch (error) {
        return Promise.reject({ status: 500, message: error.message });
    }
}


module.exports = { updateProfile, fetchUser }