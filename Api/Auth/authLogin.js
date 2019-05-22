import express from 'express';

import userController from '../Controllers/authControllerLogin';

const authLogin = express.Router();

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
*         description: User has successfully logged in
*       401:
*         description: Invalid Email or Password
*/

authLogin.post('/login', userController.loginUser);

module.exports = authLogin;
