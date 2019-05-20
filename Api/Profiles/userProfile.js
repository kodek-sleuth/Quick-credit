import express from 'express';

import settings from '../Settings/image';

import userProfileController from '../Controllers/updateProfileUser';

const userProfile = express.Router();

/**
* @swagger
* /api/v1/user/{:Email}/profile:
*   get:
*     tags:
*       - Profiles
*     name: Gets User Profile
*     summary: Gets a User Profile
*     consumes:
*       - multipart/form-data
*     parameters:
*       - name: ":Email"
*         in: path
*         description: Email of User Profile
*         required: true
*         type: string
*     responses:
*      200:
*       data: []
*/

userProfile.get('/:Email/profile', userProfileController.getUserProfile);

/**
* @swagger
* /api/v1/user/{:Email}/profile:
*   patch:
*     security:
*        - bearerAuth: []
*     tags:
*       - Profiles
*     name: Update User Profile
*     summary: Updates a User Profile
*     consumes:
*       - application/json
*     parameters:
*       - name: ":Email"
*         in: path
*         description: Email of User Profile
*         required: true
*         type: string
*       - name: body
*         in: body
*         properties:
*           Email:
*             type: string
*             example: abel@gmail.com
*           Password:
*             type: string
*             format: password
*             example: stealth
*           Fullname:
*             type: string
*             example: "Jose Kodek"
*           Address:
*             type: string
*             example: "KG ST 442"
*         required:
*           - Email
*           - Password
*           - Fullname
*           - Address
*     responses:
*      200:
*       description: Successfully Updated Profile
*      401:
*       description: User Authorisation required to access resource
*/

userProfile.patch('/:Email/profile', userProfileController.updateUserProfile);

/**
* @swagger
* /api/v1/user/{:Email}/profile/image:
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
*       - name: Image
*         in: formData
*         type: file
*         required: true
*         description: Upload an Image File.
*     responses:
*     200:
*       description: Successfully Updated Profile
*     401:
*       description: User Authorisation required to access resource
*/

userProfile.patch('/:Email/profile/image', settings.upload.single('Image'), userProfileController.userUpdateProfilePicture);

module.exports = userProfile;
