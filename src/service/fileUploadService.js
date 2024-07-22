const s3Interface = require("./s3Interface");

/**
 * Uploads files to AWS S3 based on the provided type.
 *
 * @param {Object} files - An object containing file fields.
 * @param {Object} files.plan_video - The video file for a plan.
 * @param {Object} files.banner_image - The banner image for a plan.
 * @param {Object} files.intro_video - The intro video for an exercise.
 * @param {Object} files.day_banner_image - The day banner image for an exercise.
 * @param {string} dir - The directory where the files will be uploaded.
 * @param {string} type - The type of files to be uploaded ('plan' or 'exercise').
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of S3 upload responses.
 * If no files are to be uploaded, the promise resolves to null.
 *
 * @throws {Error} - If an error occurs during the upload process.
 */
async function uploadFile(files, type) {
    try {
        const uploadPromises = [];
        let response = null;
        switch (type) {
            case 'plan':
                if (files.plan_video) {
                    const dir = 'workoutPlan/plan_videos';
                    uploadPromises.push(s3Interface.uploadToS3(files.plan_video[0], dir))
                }

                if (files.banner_image) {
                    const dir = 'workoutPlan/plan_banner_images';
                    uploadPromises.push(s3Interface.uploadToS3(files.banner_image[0], dir))
                }

                break;
            case 'day':
                if (files.intro_video) {
                    const dir = 'workoutPlan/intro_videos';
                    uploadPromises.push(s3Interface.uploadToS3(files.intro_video[0], dir))
                }

                if (files.day_banner_image) {
                    const dir = 'workoutPlan/day_banner_images';
                    uploadPromises.push(s3Interface.uploadToS3(files.day_banner_image[0], dir))
                }

                break;
            case 'exercise':
                if (files.exe_video) {
                    const dir = 'workoutPlan/exercises/videos';
                    uploadPromises.push(s3Interface.uploadToS3(files.exe_video[0], dir))
                }

                if (files.exe_image) {
                    const dir = 'workoutPlan/exercises/images';
                    uploadPromises.push(s3Interface.uploadToS3(files.exe_image[0], dir))
                }

                break;
            default:
                break;
        }

        if (uploadPromises.length) {
            response = await Promise.all(uploadPromises);
        }

        return response;

    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = uploadFile;