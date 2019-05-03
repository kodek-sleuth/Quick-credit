const express = require('express');

const authLogin = express.Router();

const userController = require('../Controllers/authControllerLogin');

/**
* @swagger
* /auth/login:
*   post:
*     tags:
*       - Users
*     name: Signup
*     summary: Logs in a user/admin
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

authLogin.post('/login', userController.loginUser);

module.exports = authLogin;
