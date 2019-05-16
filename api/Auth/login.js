import express from 'express';

import userController from '../Controllers/authLoginController';

const login = express.Router();

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
*         required:
*           - Email
*           - Password
*     responses:
*       200:
*         description: User successfully logged in
*       401:
*         description: Invalid Email or Password
*       400:
*         description: Name cannot be an integer
*/

login.post('/login', userController.loginUser);

module.exports = login;
