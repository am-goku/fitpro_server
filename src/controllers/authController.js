const responseHandler = require("../utils/responseHandler");
const { register, verifyOtp, login, verifyEmail, verifyPassChangeOTP, changePassword, sendOTP } = require('../helpers/authHelper')


/**
 * Registers a new user with the provided email and password.
 * @param {Object} req - Express request object containing the user's email and password.
 * @param {Object} res - Express response object to send the registration result.
 * @param {String} req.body.email - The user's email address.
 * @param {String} req.body.password - The user's password.
 * @returns {Promise<Object>} - A promise that resolves to the registration result or rejects with an error.
 * @throws {Error} - If there is an error during registration.
 */
async function registerUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return responseHandler(res, { status: 400, message: 'Missing or invalid credentials' });
        }

        const data = await register(email, password);

        responseHandler(res, data)
    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }
        responseHandler(res, data)
    }
}


/**
 * Sends a new OTP to the user's email address for verification.
 * 
 * @param {Object} req - Express request object containing the user's email address.
 * @param {Object} res - Express response object to send the OTP result.
 * @param {String} req.body.email - The user's email address.
 * 
 * @returns {Promise<Object>} - A promise that resolves to the OTP result or rejects with an error.
 * The promise resolves with an object containing the following properties:
 * * status: The HTTP status code (200 for success, 400 for missing email, 500 for server error).
 * * message: A message describing the result of the operation.
 * 
 * @throws {Error} - If there is an error during the OTP sending process.
 */
async function sendNewOTP(req, res) {
    try {
        const email = req.body.email;

        if (!email) {
            return responseHandler(res, { status: 400, message: 'Missing email' });
        }

        const data = await sendOTP(email);

        return responseHandler(res, data);

    } catch (error) {
        return responseHandler(res, { status: 500, message: error.message });
    }
}


/**
 * Verifies the OTP sent to the user's email address.
 * @param {Object} req - Express request object containing the user's email and OTP.
 * @param {Object} res - Express response object to send the verification result.
 * @param {String} req.body.email - The user's email address.
 * @param {String} req.body.otp - The OTP received by the user.
 * @returns {Promise<Object>} - A promise that resolves to the verification result or rejects with an error.
 * @throws {Error} - If there is an error during verification.
 */
async function verifyUserOtp(req, res) {
    try {
        const { email, otp } = req.body

        if (!email || !otp) {
            return responseHandler(res, { status: 400, message: 'Missing or invalid credentials' });
        }

        const data = await verifyOtp(otp, email);

        responseHandler(res, data)
    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }
        responseHandler(res, data);
    }
}


/**
 * Logs the user into the system using their email and password.
 * @param {Object} req - Express request object containing the user's email and password.
 * @param {Object} res - Express response object to send the login result.
 * @param {String} req.body.email - The user's email address.
 * @param {String} req.body.password - The user's password.
 * @returns {Promise<Object>} - A promise that resolves to the login result or rejects with an error.
 * @throws {Error} - If there is an error during login.
 */
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return responseHandler(res, { status: 400, message: "Missing or invalid credentials" });
        }

        const data = await login(email, password, 'user');

        responseHandler(res, data);
    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }
        responseHandler(res, data);
    }
}


/**
 * Verifies the user's email address.
 * @param {Object} req - Express request object containing the user's email address.
 * @param {Object} res - Express response object to send the verification result.
 * @param {String} req.body.email - The user's email address.
 * @returns {Promise<Object>} - A promise that resolves to the verification result or rejects with an error.
 */
async function verifyUserEmail(req, res) {
    try {
        const { email } = req.body;

        const data = await verifyEmail(email);

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
 * Verifies the user's password change OTP.
 * This function verifies the OTP sent to the user's email address for password change.
 * @param {Object} req - Express request object containing the user's email and OTP.
 * @param {String} req.body.email - The user's email address.
 * @param {String} req.body.otp - The OTP received by the user.
 * @returns {Promise<Object>} - A promise that resolves to the verification result or rejects with an error.
 */
async function verifyUserPassChangeOTP(req, res) {
    try {
        const { email, otp } = req.body;

        const data = await verifyPassChangeOTP(email, otp);

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
 * Changes the user's password after verifying the password change OTP.
 * This function changes the user's password after verifying the OTP sent to the user's email address for password change.
 * @param {Object} req - Express request object containing the user's email, OTP for password change, and the new password.
 * @param {String} req.body.email - The user's email address.
 * @param {String} req.body.otp - The OTP received by the user for password change.
 * @param {String} req.body.password - The new password for the user.
 * @returns {Promise<Object>} - A promise that resolves to the password change result or rejects with an error.
 */
async function changeUserPassword(req, res) {
    try {
        const { email, otp, password } = req.body;

        if (!email || !otp || !password) {
            return responseHandler(res, { status: 400, message: "Invalid or missing credentials" })
        }

        const data = await changePassword(email, otp, password);

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
 * Logs the admin into the system using their email and password.
 * @param {Object} req - Express request object containing the admin's email and password.
 * @param {Object} res - Express response object to send the login result.
 * @param {String} req.body.email - The admin's email address.
 * @param {String} req.body.password - The admin's password.
 * @returns {Promise<Object>} - A promise that resolves to the login result or rejects with an error.
 * @throws {Error} - If there is an error during login.
 */
async function loginAdmin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return responseHandler(res, { status: 400, message: "Missing or invalid credentials" });
        }

        const data = await login(email, password, 'admin');

        responseHandler(res, data);
    } catch (error) {
        const data = {
            status: 500,
            message: error.message,
        }
        responseHandler(res, data);
    }
}



module.exports = {
    registerUser,
    sendNewOTP,
    verifyUserOtp,
    loginUser,
    verifyUserEmail,
    verifyUserPassChangeOTP,
    changeUserPassword,
    loginAdmin,
}