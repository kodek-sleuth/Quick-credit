const express = require('express');

const authSignup = express.Router();

const userController = require('../Controllers/authControllerSignUp');

const image = require('../Settings/image');

/**
* @swagger
* /auth/signup:
*   post:
*     tags:
*       - Users
*     name: Signup
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


authSignup.post('/signup', image.upload.single('Image'), userController.createUser);

module.exports = authSignup;
