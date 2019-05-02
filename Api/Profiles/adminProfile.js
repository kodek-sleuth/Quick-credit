const express = require('express');

const settings = require('../Settings/image');

const adminProfile = express.Router();

const adminProfileController = require('../Controllers/adminUpdateProfile');

adminProfile.get('/:Email/profile', adminProfileController.getAdminProfile);

adminProfile.patch('/:Email/profile', settings.upload.single('Image'), adminProfileController.updateAdminProfile);

module.exports = adminProfile;
