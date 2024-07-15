const mongoose = require('mongoose');
const dotenv = require('dotenv');

/**
 * Loads environment variables from a `.env` file.
 * This function reads the `.env` file and loads the environment variables specified in it.
 * @param {String} [path=process.env.DOTENV_PATH] - The path to the `.env` file. Defaults to the value of the `DOTENV_PATH` environment variable if set, otherwise defaults to the current directory.
 * @returns {Object} - An object containing the loaded environment variables.
 */
dotenv.config();

/**
 * Connects to the MongoDB database using Mongoose.
 *
 * This function establishes a connection to the MongoDB database using Mongoose. It uses the `MONGO_URI` environment variable to specify the connection URI. If the connection is successful, it logs a message indicating the successful establishment of the database connection. If there is an error connecting to the database, the process will exit with an error code.
 *
 * @param {string} [uri=process.env.MONGO_URI] - The MongoDB connection URI. Defaults to the value of the `MONGO_URI` environment variable.
 * @param {Object} [options={useNewUrlParser: true, useUnifiedTopology: true}] - Additional options for the Mongoose connection. Defaults to `{ useNewUrlParser: true, useUnifiedTopology: true }`.
 *
 * @returns {Promise<void>} - A Promise that resolves when the database connection is established.
 */
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Database (MongoDB) connection established');
    } catch (error) {
        console.error('Error connecting to database (MongoDB)');
        process.exit(1);   // Exit the process with an error code      
    }
}

/**
 * Exporting connectBD funtion to use in other files
 */
module.exports = connectDB;