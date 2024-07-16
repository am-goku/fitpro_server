const User = require("../models/User");
const { generateToken } = require("../service/jwt");


/**
 * Signs up a new user using their Google credentials.
 *
 * @param {String} name - The user's name.
 * @param {String} email - The user's email address.
 * @param {String} profilePic - The user's profile picture URL.
 * @returns {Promise<Object>} A promise that resolves to an object containing the user's information, a success message, and an access token if the user is successfully created and verified.
 * @throws {Error} If an error occurs during the signup process.
 */
async function googleSignup( name, email, profilePic ) {
    try {
        const userExists = await User.findOne({ email }).select("-password");

        if (userExists) {
            const data = {
                status: 409,
                message: "User already exists",
            }
            return data;
        }

        const newUser = new User({
            name,
            email,
            profilePic,
            isVerified: true
        });

        const user = await newUser.save();

        const accessToken = generateToken(user._id, user.role);

        const data = {
            status: 200,
            message: "Account has been verified and Token generated",
            user,
            accessToken
        }

        return data;

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        return Promise.reject(data);
    }
}


/**
 * Logs in a user using their Google credentials.
 *
 * @param {String} email - The user's email address.
 * @returns {Promise<Object>} A promise that resolves to an object containing the user's information, a success message, and an access token if the user is successfully found and verified.
 * @throws {Error} If an error occurs during the login process.
 */
async function googleLogin(email) {
    try {
        const user = await User.findOne({ email }).select("-password");

        if (!user) {
            return { status: 400, message: "Invalid email address" };
        }

        const accessToken = generateToken(user._id, user.role);

        const data = {
            status: 200,
            message: "Login successful",
            user,
            accessToken
        };

        return data;

    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }

        return Promise.reject(data);
    }
}


module.exports = { googleSignup, googleLogin }