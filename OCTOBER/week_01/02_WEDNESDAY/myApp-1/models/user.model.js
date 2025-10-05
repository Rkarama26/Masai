

const mongoose = require('mongoose');

const validateURL = function (url) {
    const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
    return urlRegex.test(url);
};

// Define the nested profile schema
const profileSchema = new mongoose.Schema({
    profileName: {
        type: String,
        enum: ['fb', 'twitter', 'github', 'instagram'],
        required: true
    },
    url: {
        type: String,
        required: true,
        validate: [validateURL, 'Please provide a valid URL']
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long']
    },
    profiles: {
        type: [profileSchema], // array of nested profile objects
        default: []
    }
}, { timestamps: true });

// Create User model
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;