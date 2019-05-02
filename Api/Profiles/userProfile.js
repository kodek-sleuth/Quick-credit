const express = require('express');

const settings = require('../Settings/image');

const userProfile = express.Router();

const userProfileController = require('../Controllers/updateProfileUser');

userProfile.patch('/user/:userId/profile', settings.upload.single('Image'), userProfileController.updateUserProfile);

module.exports = userProfile;
