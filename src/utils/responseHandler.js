const sanitizeData = require("./sanitizeData");

/**
 * Handles the response by setting the appropriate HTTP status code and sending the response data.
 *
 * @param {Response} res - The Express response object.
 * @param {Object} data - The response data containing status and other details.
 *
 * @returns {void} - No return value, but sends the response with the appropriate status code and data.
 */
function responseHandler(res, data) {
    const statusMessages = {
        200: "OK",
        201: "CREATED",
        400: "BAD_REQUEST",
        401: "UNAUTHORIZED",
        403: "FORBIDDEN",
        404: "NOT_FOUND",
        409: "CONFLICT",
        410: "TOKEN_EXPIRED",
        500: "SERVER_ERROR"
    };

    const statusCode = data?.status || 500; // Default to 500 if status is undefined
    const message = statusMessages[statusCode] || "SERVER_ERROR";

    try {
        res.status(statusCode).send({ ...data, status_code: message });
    } catch (error) {
        res.status(500).send({ ...data, status_code: "SERVER_ERROR" });
    }
}

module.exports = responseHandler;