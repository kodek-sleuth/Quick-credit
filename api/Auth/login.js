const express = require('express');

const login = express.Router();

const userController = require('../Controllers/authLoginController');


/**
* @swagger
* /api/v1/auth/login:
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

login.post('/login', userController.loginUser);

module.exports = login;
