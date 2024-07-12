const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');

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
    apis: ['./src/routes/*.js'] // Paths to files where you have documented your API routes,
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