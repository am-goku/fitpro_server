/**
 * This module exports a configured Multer instance for handling file uploads.
 * Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files.
 *
 * @module upload
 * @requires multer
 * @returns {object} - A configured Multer instance
 */

const multer = require('multer');

/**
 * Storage configuration for Multer.
 * Defines where to store uploaded files and how to name them.
 *
 * @constant
 * @type {object}
 * @property {function} destination - A function that determines the destination of the uploaded file.
 * @property {function} filename - A function that determines the filename of the uploaded file.
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        /**
        * Determines the destination of the uploaded file.
        *
        * @param {object} req - The Express request object
        * @param {object} file - The uploaded file object
        * @param {function} cb - The callback function to be called with the destination path
        */
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        /**
         * Determines the filename of the uploaded file.
         *
         * @param {object} req - The Express request object
         * @param {object} file - The uploaded file object
         * @param {function} cb - The callback function to be called with the filename
         */
        cb(null, Date.now() + '-' + file.originalname);
    }
});

/**
 * A configured Multer instance.
 *
 * @constant
 * @type {object}
 * @property {function} single - A Multer function for handling a single file upload
 * @property {function} array - A Multer function for handling multiple file uploads
 * @property {function} fields - A Multer function for handling multiple file uploads with different fields
 * @property {function} any - A Multer function for handling any file upload
 */
const upload = multer({ storage });

module.exports = upload;