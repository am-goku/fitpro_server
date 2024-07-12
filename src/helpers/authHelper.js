const User = require("../models/User");
const { generateToken } = require("../service/jwt");
const sendOtpEmail = require("../service/mailService");


/**
 * Registers a new user in the system.
 * @param {string} email - The email address of the user to be registered.
 * @param {string} password - The password of the user to be registered.
 * @returns {Promise<{status: number, message: string}>} - A promise that resolves to an object containing the status code and a message indicating whether the registration was successful.
 * @throws {Error} - If an error occurs during the registration process.
 */
async function register(email, password) {
    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return { status: 409, message: "User already exists" }
        }

        const user = new User({
            email,
            password
        })

        const otp = Math.floor(10000000 + Math.random() * 90000000).toString();
        const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

        user.otp = otp.toString();
        user.otpExpires = otpExpires;

        await user.save();

        await sendOtpEmail(user.email, user.otp);

        return { status: 200, message: "OTP has been sent successfully" }

    } catch (error) {
        return Promise.reject({ status: 500, message: error.message })
    }
}


/**
 * Verifies the OTP sent to the user's email address.
 * If the OTP is valid and has not expired, the user's account is marked as verified and a JWT access token is generated.
 * @param {string} otp - The one-time password entered by the user.
 * @param {string} email - The email address associated with the user's account.
 * @returns {Promise<{status: number, message: string, accessToken: string}>} - A promise that resolves to an object containing the status code, a message, and a JWT access token if the OTP is valid.
 * @throws {Error} - If an error occurs during the verification process.
 */
async function verifyOtp(otp, email) {
    try {

        const user = await User.findOne({ email });

        if (!user) return { status: 400, message: "Invalid email address" }

        if (user.otp !== otp.toString() || user.otpExpires < Date.now()) {
            return { status: 400, message: "OTP expired or invalid" }
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const accessToken = generateToken(user.id, user.role);

        return { status: 200, message: "Account has been verified and Token generated", accessToken }

    } catch (error) {
        return Promise.reject({ status: 500, message: error.message })
    }
}


/**
 * Logs the user into the system.
 * @param {string} email - The email address associated with the user's account.
 * @param {string} password - The password entered by the user.
 * @returns {Promise<{status: number, message: string, user: User, accessToken: string}>} - A promise that resolves to an object containing the status code, a message, the user object, and a JWT access token if the login credentials are valid.
 * @throws {Error} - If an error occurs during the login process.
 */
async function login(email, password) {
    try {

        const user = await User.findOne({ email });

        if (!user) return { status: 400, message: "Invalid email address" };

        if (!user.isVerified) return { status: 403, message: "Account is not verified" };

        const isMatch = await user.matchPassword(password);

        if (!isMatch) return { status: 400, message: "Invalid password" };

        const accessToken = generateToken(user.id, user.role);

        user.password = undefined;

        const data = {
            status: 200,
            message: "Login successful",
            user,
            accessToken
        }

        return data;

    } catch (error) {
        return Promise.reject({ status: 500, message: error.message })
    }
}


/**
 * Verifies the user's email address by sending an OTP to the provided email address.
 * If the user is already verified, an error message is returned.
 * @param {string} email - The email address associated with the user's account.
 * @returns {Promise<{status: number, message: string}>} - A promise that resolves to an object containing the status code and a message indicating whether the OTP has been sent successfully.
 * @throws {Error} - If an error occurs during the verification process.
 */
async function verifyEmail(email) {
    try {
        const user = await User.findOne({ email });

        if (!user) return { status: 400, message: "User not found" }

        if (!user.isVerified) return { status: 403, message: "Account is not verified" };

        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

        user.otp = otp.toString();
        user.otpExpires = otpExpires;

        await user.save();

        await sendOtpEmail(user.email, user.otp);

        const data = { status: 200, message: "OTP has been sent successfully" };
        return data;

    } catch (error) {
        return Promise.reject({ status: 500, message: error.message });
    }
}


/**
 * Verifies the OTP sent to the user's email address for password change.
 * If the OTP is valid and has not expired, the function returns a success message.
 * @param {string} email - The email address associated with the user's account.
 * @param {string} otp - The one-time password entered by the user.
 * @returns {Promise<{status: number, message: string}>} - A promise that resolves to an object containing the status code and a success message if the OTP is valid.
 * @throws {Error} - If an error occurs during the verification process.
 */
async function verifyPassChangeOTP(email, otp) {
    try {
        const user = await User.findOne({ email });

        if (!user) return { status: 400, message: "Invalid email address" }

        if (user.otp !== otp.toString() || user.otpExpires < Date.now()) {
            return { status: 400, message: "Invalid or expired OTP" }
        }

        const data = {
            status: 200,
            message: "OTP verification successful",
        }

        return data;

    } catch (error) {
        return Promise.reject({ status: 500, message: error.message });
    }
}


/**
 * Changes the user's password.
 * This function updates the user's password in the database after verifying the OTP sent to the user's email address.
 * @param {string} email - The email address associated with the user's account.
 * @param {string} otp - The one-time password entered by the user.
 * @param {string} password - The new password to be set for the user.
 * @returns {Promise<{status: number, message: string}>} - A promise that resolves to an object containing the status code and a success message if the OTP is valid.
 * @throws {Error} - If an error occurs during the verification process.
 */
async function changePassword(email, otp, password) {
    try {
        const user = await User.findOne({ email });
        if (!user) return { status: 400, message: "Invalid email address" };

        if (user.otp !== otp.toString() || user.otpExpires < Date.now()) {
            return { status: 400, message: "Invalid or expired OTP" };
        }

        user.password = password;
        user.otp = undefined;
        user.otpExpires = undefined;
        
        await user.save();

        return { status: 200, message: "Password has been changed" };

    } catch (error) {
        return Promise.reject({ status: 500, message: error.message });
    }
}






module.exports = {
    register,
    verifyOtp,
    login,
    verifyEmail,
    verifyPassChangeOTP,
    changePassword
}