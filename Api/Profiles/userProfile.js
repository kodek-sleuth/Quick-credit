const express = require('express');

const settings = require('../Settings/image');

const userProfile = express.Router();

const userProfileController = require('../Controllers/updateProfileUser');


/**
* @swagger
* /user/{:Email}/profile:
*   get:
*     security:
*        - bearerAuth: []
*     tags:
*       - Profiles
*     name: Update User Profile
*     summary: Updates a User Profile
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
*         description: User Has Successfully Logged In
*       401:
*         description: Invalid Email or Password
*/

userProfile.get('/:Email/profile', userProfileController.getUserProfile);


/**
* @swagger
* /user/{:Email}/profile:
*   patch:
*     security:
*        - bearerAuth: []
*     tags:
*       - Profiles
*     name: Update User Profile
*     summary: Updates a User Profile
*     consumes:
*       - multipart/form-data
*     parameters:
*       - name: ":Email"
*         in: path
*         description: Email of User Profile
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

userProfile.patch('/:Email/profile', settings.upload.single('Image'), userProfileController.updateUserProfile);

module.exports = userProfile;
