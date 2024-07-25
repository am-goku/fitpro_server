const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');

/**
 * Loads environment variables from a `.env` file.
 * This function reads the `.env` file and loads the environment variables specified in it.
 * @param {String} [path=process.env.DOTENV_PATH] - The path to the `.env` file. Defaults to the value of the `DOTENV_PATH` environment variable if set, otherwise defaults to the current directory.
 * @returns {Object} - An object containing the loaded environment variables.
 */
dotenv.config();

/**
 * Generates the Swagger specification for the given API routes.
 * @param {Object} options - The options object containing the Swagger specification definition and the paths to the API routes files.
 * @returns {Object} The generated Swagger specification.
 */
const swaggerSpec = swaggerJsDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'FitPro API Documentation',
            version: '1.0.0',
            description: 'API Documentation for FirPro Application',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
            {
                url: process.env.SERVER_ADDRESS,
                description: 'Production server',
            }
        ],
    },
    apis: ['./src/**/*.js'] // Paths to files where you have documented your API routes,
});


/**
 * Sets up the Swagger UI middleware for the given Express app.
 * @param {Express.Application} app - The Express application to which the Swagger UI middleware will be added.
 */
const swaggerDocs = (app) => {
    app.use('/api/v1/app-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
};

/**
 * Exporting swaggerDocs funtion to use in other files
 */
module.exports = swaggerDocs;