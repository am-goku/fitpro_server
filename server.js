const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const cors = require('cors');
const connectDB = require('./src/config/db');
const swaggerDocs = require('./src/config/swagger');
const authRoutes = require('./src/routes/authRoutes');
const oAuthRoutes = require('./src/routes/oAuthRoute');
const userRoutes = require('./src/routes/userRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

/**
 * Loads environment variables from a `.env` file.
 * This function reads the `.env` file and loads the environment variables specified in it.
 * @param {String} [path=process.env.DOTENV_PATH] - The path to the `.env` file. Defaults to the value of the `DOTENV_PATH` environment variable if set, otherwise defaults to the current directory.
 * @returns {Object} - An object containing the loaded environment variables.
 */
dotenv.config();

/** 
 * Connects to the database using the provided configuration.
 * This function initializes the connection to the database specified in the 'config/db.js' file.
 */
connectDB();

/**
 * Initializes the Express application.
 * @param {Object} expressInstance - The Express instance to initialize.
 */
const app = express();

/**
 * This function enables Cross-Origin Resource Sharing (CORS) for the Express application.
 * It allows the server to receive requests from any origin.
 * @param {Object} options - An object containing the CORS options.
 * @param {String} options.origin - The origin of the request. Defaults to "*" to allow requests from any origin.
 */
app.use(cors({ origin: "*" }))

/**
 * This function enables the Morgan middleware to log HTTP requests and responses.
 * It uses the 'dev' format to log the request and response data.
 * @param {String} format - The format of the log message. Defaults to 'dev' for detailed logging.
 */
app.use(logger("dev"));

/**
 * This function enables the Express application to parse JSON request bodies.
 * It allows the server to receive and process JSON data sent in HTTP requests.
 */
app.use(express.json());

/**
 * Initializes the Swagger documentation for the Express application.
 * This function sets up the Swagger middleware to generate and serve API documentation for the Express application.
 * @param {Object} app - The Express application instance to which the Swagger middleware is attached.
 */
swaggerDocs(app);


/**
 * Initializes the Express application to use the specified routes for handling API requests.
 * @param {String} path - The base path for the routes.
 * @param {Object} routes - The routes object containing the route handlers for the specified path.
 */
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/oauth', oAuthRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes);



/**
 * This function retrieves the server's port number from the environment variable 'PORT' or defaults to 5000 if not specified.
 * @returns {Number} The port number on which the server is running.
 */
const PORT = process.env.PORT || 5000;

/**
 * Function to log server startup and API documentation availability.
 * @param {Number} PORT - The port number on which the server is running.
 */
app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API documentation available at http://localhost:${PORT}/api/v1/app-doc`);
})