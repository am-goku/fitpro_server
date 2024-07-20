const User = require("../models/User");
const { generateToken } = require("../service/jwt");


/**
 * Performs a Google login and handles user creation if necessary.
 *
 * @param {Object} body - The request body containing user information.
 * @param {string} body.name - The user's name.
 * @param {string} body.email - The user's email.
 * @param {string} body.profilePic - The user's profile picture URL.
 *
 * @returns {Promise<Object>} - A promise that resolves to an object containing the login status, user data, and access token.
 * @throws {Object} - A promise that rejects with an object containing the error status and message.
 */
async function googleLogin(body) {
    try {

        const data = {
            status: 200,
            message: "Login successful",
            user: null,
            accessToken: null
        }

        data.user = await User.findOne({ email: body.email }).select("-password");

        if (!data.user) {
            const newUser = new User({
                name: body.name,
                email: body.email,
                profilePic: body.profilePic,
                isVerified: true
            });

            data.user = await newUser.save();
            data.message = "Account created successfully";

        }

        data.accessToken = generateToken(data.user._id, data.user.role);

        return data;

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        return Promise.reject(data);
    }
}


module.exports = { googleLogin }