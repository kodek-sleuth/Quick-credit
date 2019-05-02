const express = require('express');

const settings = require('../Settings/image');

const jwtMiddleware = require('../Settings/checkAuth');

const adminProfile = express.Router();

const adminProfileController = require('../Controllers/adminUpdateProfile');

adminProfile.get('/:Email/profile', jwtMiddleware, adminProfileController.getAdminProfile);

adminProfile.patch('/:Email/profile', jwtMiddleware, settings.upload.single('Image'), adminProfileController.updateAdminProfile);

module.exports = adminProfile;
