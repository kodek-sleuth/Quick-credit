const express = require('express');

const settings = require('../Settings/image');

const jwtMiddleware = require('../Settings/checkAuth');

const adminProfile = express.Router();

const adminProfileController = require('../Controllers/adminUpdateProfile');

adminProfile.get('/:Email/profile', adminProfileController.getAdminProfile);

/**
* @swagger
* /admin/{:Email}/profile:
*   patch:
*     security:
*        - bearerAuth: []
*     tags:
*       - Profiles
*     name: Update Admin Profile
*     summary: Updates an Admin Profile
*     consumes:
*       - multipart/form-data
*     parameters:
*       - name: ":Email"
*         in: path
*         description: Email of Admin Profile
*         required: true
*         type: string
*       - name: Fullname
*         in: formData
*         type: string
*         description: Yahya Jalal.
*       - name: Email
*         in: formData
*         type: string
*         description: yahya@gmail.com.
*       - name: Password
*         in: formData
*         type: string
*         description: stealth.
*       - name: Address
*         in: formData
*         type: string
*         description: Kitende, Entebbe.
*       - name: Image
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
