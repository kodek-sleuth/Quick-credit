const express = require('express');

const authLogin = express.Router();

const userController = require('../Controllers/authControllerSignup');

/**
* @swagger
* /api/v1/auth/signup:
*   post:
*     tags:
*       - Auth
*     name: Login
*     summary: Logs in a User/Admin
*     consumes:
*       - application/json
*     parameters:
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
*           isAdmin:
*             type: string
*             example: "False"
*         required:
*           - Email
*           - Password
*           - isAdmin
*     responses:
*       200:
*         description: User Has Successfully Logged In
*       401:
*         description: Invalid Email or Password
*/

authLogin.post('/signup', userController.signUpUser);

module.exports = authLogin;
