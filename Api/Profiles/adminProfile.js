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
*     name: Gets admin Profile
*     summary: Gets a admin Profile
*     consumes:
*       - multipart/form-data
*     parameters:
*       - name: ":Email"
*         in: path
*         description: Email of admin Profile
*         required: true
*         type: string
*     responses:
*       200:
*         data: []
*/

adminProfile.get('/:Email/profile', jwtMiddleware, adminProfileController.getAdminProfile);

/**
* @swagger
* /api/v1/admin/{:Email}/profile:
*   patch:
*     security:
*        - bearerAuth: []
*     tags:
*       - Profiles
*     name: Update admin Profile
*     summary: Updates a admin Profile
*     consumes:
*       - application/json
*     parameters:
*       - name: ":Email"
*         in: path
*         description: Email of admin Profile
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
*       200:
*         description: Successfully Updated Profile
*       401:
*         description: admin Authorisation required to access resource
*/

adminProfile.patch('/:Email/profile', jwtMiddleware, adminProfileController.updateAdminProfile);

/**
* @swagger
* /api/v1/admin/{:Email}/profile/image:
*   patch:
*     security:
*        - bearerAuth: []
*     tags:
*       - Profiles
*     name: Update admin Profile
*     summary: Updates a admin Profile
*     consumes:
*       - multipart/form-data
*     parameters:
*       - name: ":Email"
*         in: path
*         description: Email of admin Profile
*         required: true
*         type: string
*       - name: Image
*         in: formData
*         type: file
*         required: true
*         description: Upload an Image File.
*     responses:
*       200:
*         description: Successfully Updated Profile
*       401:
*         description: admin Authorisation required to access resource
*/

adminProfile.patch('/:Email/profile/image', jwtMiddleware, settings.upload.single('Image'), adminProfileController.adminUpdateProfilePicture);

module.exports = adminProfile;
