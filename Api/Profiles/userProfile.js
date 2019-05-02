const express = require('express');

const settings = require('../Settings/image');

const userProfile = express.Router();

const userProfileController = require('../Controllers/updateProfileUser');

userProfile.get('/:Email/profile', userProfileController.getUserProfile);

userProfile.patch('/:Email/profile', settings.upload.single('Image'), userProfileController.updateUserProfile);

module.exports = userProfile;
