import express from 'express';

import userController from '../Controllers/authControllerSignUp';

const authSignup = express.Router();

/**
* @swagger
* /api/v1/auth/signup:
*   post:
*     tags:
*       - Auth
*     name: Signup
*     summary: Signup a User/Admin
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         properties:
*           Email:
*             type: string
*             example: abel@gmail.com
*           Firstname:
*             type: string
*             example: Kimbugwe
*           Lastname:
*             type: string
*             example: Yasin
*           Address:
*             type: string
*             example: 48kg 299 Kigali
*           isAdmin:
*             type: boolean
*             example: true
*           Password:
*             type: string
*             format: password
*             example: stealth
*         required:
*           - Email
*           - Firstname
*           - Lastname
*           - Address
*           - Password
*     responses:
*       200:
*         description: User has successfully signed up
*       401:
*         description: Invalid Email or Password
*/

authSignup.post('/signup', userController.createUser);

module.exports = authSignup;
