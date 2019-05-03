const express = require('express');

const settings = require('../Settings/image');

const jwtMiddleware = require('../Settings/checkAuth');

const adminProfile = express.Router();

const adminProfileController = require('../Controllers/adminUpdateProfile');

adminProfile.get('/:Email/profile', jwtMiddleware, adminProfileController.getAdminProfile);

/**
* @swagger
* /admin/signup:
*   post:
*     tags:
*       - Profiles
*     name: Update Admin Profile
*     summary: Signs up a customer
*     consumes:
*       - multipart/form-data
*     parameters:
*       - name: Fullname
*         in: formData
*         type: string
*         required: true
*         description: Yahya Jalal.
*       - name: Email
*         in: formData
*         type: string
*         required: true
*         description: yahya@gmail.com.
*       - name: Password
*         in: formData
*         type: string
*         required: true
*         description: stealth.
*       - name: isAdmin
*         in: formData
*         type: string
*         required: true
*         description: True or False.
*       - name: Address
*         in: formData
*         type: string
*         description: Kitende, Entebbe.
*       - name: uploadImage
*         in: formData
*         type: file
*         required: true
*         description: Upload an Image File.
*     responses:
*       200:
*         description: User Has Successfully Logged In
*       401:
*         description: Invalid Email or Password
*/

adminProfile.patch('/:Email/profile', jwtMiddleware, settings.upload.single('Image'), adminProfileController.updateAdminProfile);

module.exports = adminProfile;
