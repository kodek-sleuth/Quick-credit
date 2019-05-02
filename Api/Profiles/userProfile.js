const express = require('express');

const settings = require('../Settings/image');

const userProfile = express.Router();

const userProfileController = require('../Controllers/updateProfileUser');

userProfile.get('/user/:Email/profile', userProfileController.getUserProfile);

userProfile.patch('/user/:Email/profile', settings.upload.single('Image'), userProfileController.updateUserProfile);

module.exports = userProfile;
