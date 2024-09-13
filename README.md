```markdown
# FitPro Fitness App Backend

FitPro is a fitness app backend built with Node.js, Express, and MongoDB. It provides various fitness-related functionalities like user management, workout tracking, and more. This backend supports authentication using JWT tokens and integrates with AWS S3 for media storage and email notifications using SMTP.

## Features

- **User Authentication**: JWT-based authentication for secure login and signup.
- **Workouts & Plans**: APIs for managing user workouts and fitness plans.
- **Media Storage**: Integration with AWS S3 to store user-uploaded media files (images, videos).
- **Email Notifications**: Sends automated emails using SMTP for verification, password resets, and updates.
- **Database**: MongoDB used to store user, plan, workout, and other related data.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/fitpro-backend.git
   cd fitpro-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```bash
   PORT=5000

   SERVER_ADDRESS=https://domain.com/

   MONGO_URI=mongodb://127.0.0.1:27017/fitpro?

   JWT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

   SMTP_HOST=host.example.com
   SMTP_PORT=your_port

   SMTP_USER=sample@example.com
   SMTP_PASS=xxxx xxxx xxxx xxxx

   # AWS S3 Bucket Configuration
   AWS_REGION=your_region
   AWS_BUCKET_NAME=your_bucket_name
   AWS_ACCESS_KEY_ID=your_accesskey
   AWS_SECRET_ACCESS_KEY=your_secret_key
   ```

4. (Optional) You can also configure a secondary S3 bucket by uncommenting the following in the `.env` file:
   ```bash
   # AWS_REGION=your_region
   # AWS_BUCKET_NAME=your_bucket_name
   # AWS_ACCESS_KEY_ID=your_access_key
   # AWS_SECRET_ACCESS_KEY=your_secret_key
   ```

6. To build the app for production mode:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. To run the server in development mode with live-reload:
   ```bash
   npm run dev
   ```

## Features
## Environment Variables

The app relies on the following environment variables:

- **PORT**: The port number where the server runs.
- **SERVER_ADDRESS**: The public IP or domain address for the backend server.
- **MONGO_URI**: MongoDB connection string with configuration parameters.
- **JWT_SECRET**: Secret key used to sign JWT tokens for user authentication.
- **SMTP_HOST**: SMTP server host for email delivery.
- **SMTP_PORT**: SMTP server port (usually 587 for TLS).
- **SMTP_USER**: The email address used to send emails via SMTP.
- **SMTP_PASS**: The SMTP email password or app-specific password.
- **AWS_REGION**: The AWS region where the S3 bucket is located.
- **AWS_BUCKET_NAME**: The name of the AWS S3 bucket used to store media.
- **AWS_ACCESS_KEY_ID**: AWS access key for authentication.
- **AWS_SECRET_ACCESS_KEY**: AWS secret access key for authentication.

## Project Structure

- **`/routes`**: Defines the API endpoints.
- **`/controllers`**: Contains the business logic for handling requests and sending responses.
- **`/models`**: Mongoose models for MongoDB collections.
- **`/config`**: Holds configuration files for setting up database, email, and AWS services.
- **`/middleware`**: Middlewares for authentication, error handling, and validation.

## AWS S3 Configuration

FitPro integrates with AWS S3 for storing media files such as user profile images and workout videos. To configure your S3 bucket, set the AWS-related variables in the `.env` file:

- **AWS_REGION**: Region where your S3 bucket is located.
- **AWS_BUCKET_NAME**: Name of the S3 bucket to store the files.
- **AWS_ACCESS_KEY_ID**: AWS access key for the S3 bucket.
- **AWS_SECRET_ACCESS_KEY**: AWS secret access key for authentication.

## SMTP Email Configuration

The application uses SMTP for sending email notifications such as account verification, password resets, and other important updates. To use your email service, configure the SMTP settings in your `.env` file:

- **SMTP_HOST**: The SMTP server (e.g., `smtp.gmail.com`).
- **SMTP_PORT**: SMTP server port (587 for Gmail).
- **SMTP_USER**: Your SMTP email address.
- **SMTP_PASS**: Your SMTP email password or app-specific password.

## API Documentation

Please refer to the API documentation for details on available endpoints, parameters, and request/response formats.

## License

This project is licensed under the MIT License.

```

This README file provides a detailed guide to setting up the FitPro backend, including the environment variables, project structure, AWS S3 configuration, and SMTP email setup. Adjust the placeholder values according to your actual environment and requirements.
