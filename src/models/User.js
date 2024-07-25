const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * This function defines the schema for a user in the FitPro application.
 * It includes fields for name, email, password, OTP, OTP expiration, and verification status.
 * Additionally, it includes fields for fitness profile such as age, gender, height, weight, goal, experience, workout type, and workout frequency.
 * The schema also includes timestamps for createdAt and updatedAt fields.
 *
 * @param {mongoose.Schema} mongoose - The mongoose schema object.
 * @returns {mongoose.Schema} A mongoose schema object representing a user in the FitPro application.
 */
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50
    },
    profilePic: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        set: value => value.toLowerCase(),
        unique: true,
    },
    password: {
        type: String,
        required: false,
        minlength: 8,
    },
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    },

    // Fitness Profile

    age: {
        type: Number,
        required: false,
    },
    gender: {
        type: String,
        required: false,
        set: value => value.toLowerCase(),
        enum: ['male', 'female', 'other'],
    },
    height: {
        value: {
            type: Number,
            min: 0
        },
        unit: {
            type: String,
            set: value => value.toLowerCase(),
            enum: ['cm', 'ft'],
        }
    },
    weight: {
        value: {
            type: Number,
            min: 0
        },
        unit: {
            type: String,
            set: value => value.toLowerCase(),
            enum: ['kg', 'lb'],
        }
    },
    goal: {
        type: String,
        set: value => value.toLowerCase(),
    },
    experience: {
        type: String,
        set: value => value.toLowerCase(),
    },
    workoutType: {
        type: String,
        set: value => value.toLowerCase(),
    },
    workoutFrequency: {
        type: Number,
    }

}, { timestamps: true });


/**
 * This function is a pre-save hook that hashes the user's password before saving it to the database.
 * It checks if the password field has been modified, and if so, it generates a salt and hashes the password using bcrypt.
 * @param {Function} next - A callback function that is called when the pre-save hook is done processing.
 */
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


/**
 * This method is used to compare the entered password with the hashed password stored in the database.
 * It uses the bcrypt library to perform the comparison and returns a boolean value indicating whether the passwords match.
 * @param {String} enteredPassword - The password entered by the user.
 * @returns {Promise<Boolean>} A Promise that resolves to a boolean value indicating whether the entered password matches the hashed password stored in the database.
 */
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


/**
 * This model represents a user in the FitPro application. It includes fields for name, email, password, OTP, OTP expiration, and verification status.
 */
const User = mongoose.model('User', UserSchema);

/**
 * Export the User model for use in other files.
 */
module.exports = User;



