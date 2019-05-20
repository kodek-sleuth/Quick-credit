import express from 'express';

import userController from '../Controllers/authControllerSignUp';

const authSignup = express.Router();

const image = require('../Settings/image');

/**
* @swagger
* /api/v1/auth/signup:
*   post:
*     tags:
*       - Auth
*     name: Signup
*     summary: Signs up a User/Admin
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
*       - name: Image
*         in: formData
*         type: file
*         required: true
*         description: Upload an Image File.
*     responses:
*       201:
*         description: User Has Successfully Signed Up
*       401:
*         description: Invalid Email or Password
*/


authSignup.post('/signup', image.upload.single('Image'), userController.createUser);

module.exports = authSignup;
