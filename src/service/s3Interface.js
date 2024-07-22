/* The code `const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();` is importing the necessary modules and libraries for interacting with
AWS S3 services and for loading environment variables from a `.env` file using the `dotenv` library. */
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();


/**
 * Represents an interface for interacting with an AWS S3 bucket.
 */
class BucketInterface {
    constructor() {
        /**
         * An instance of the AWS S3 client.
         * @type {S3Client}
         */
        this.client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            }
        })
    }

    /**
     * Uploads a file to AWS S3 bucket.
     *
     * @param {Object} file - The file object to be uploaded.
     * @param {Buffer} file.buffer - The buffer of the file.
     * @param {string} file.mimetype - The MIME type of the file.
     * @param {string} dir - The directory under which the file will be stored in the S3 bucket.
     *
     * @returns {Promise<string>} - A promise that resolves to the URL of the uploaded file.
     * If the upload is successful, the promise resolves with the URL.
     * If an error occurs during the upload, the promise rejects with the error.
     */
    async uploadToS3(file, dir) {
        try {
            const key = `${dir}/${Date.now()}-${file.originalname}`
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            };

            const command = new PutObjectCommand(params);

            await this.client.send(command);

            const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`

            return url;

        } catch (error) {
            return Promise.reject(error)
        }
    }
};

/* `const s3Interface = new BucketInterface();` creates a new instance of the `BucketInterface` class,
which represents an interface for interacting with an AWS S3 bucket. This instance is stored in the
variable `s3Interface`. */
const s3Interface = new BucketInterface();

/* `module.exports = s3Interface;` is exporting the `s3Interface` object so that it can be accessed and
used in other parts of the codebase or in other files. This allows other modules or files to import
and utilize the functionality provided by the `s3Interface` object, such as uploading files to an
AWS S3 bucket. */
module.exports = s3Interface;