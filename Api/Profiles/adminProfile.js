const express = require('express');

const settings = require('../Settings/image');

const jwtMiddleware = require('../Settings/checkAuthAdmin');

const adminProfile = express.Router();

const adminProfileController = require('../Controllers/adminUpdateProfile');


/**
* @swagger
* /api/v1/admin/{:Email}/profile:
*   get:
*     security:
*        - bearerAuth: []
*     tags:
*       - Profiles
*     name: Gets User Profile
*     summary: Gets an Admin Profile
*     consumes:
*       - multipart/form-data
*     parameters:
*       - name: ":Email"
*         in: path
*         description: Email of User Profile
*         required: true
*         type: string
*     responses:
*       200:
*         data: []
*/

adminProfile.get('/:Email/profile', adminProfileController.getAdminProfile);

/**
* @swagger
* /api/v1/admin/{:Email}/profile:
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
*         description: Successfully Updated Profilen
*       401:
*         description: Admin Authorisation required to access resource
*/

adminProfile.patch('/:Email/profile', jwtMiddleware, settings.upload.single('Image'), adminProfileController.updateAdminProfile);

module.exports = adminProfile;
