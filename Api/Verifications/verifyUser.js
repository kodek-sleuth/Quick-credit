
const express = require('express');

const verify = express.Router();

const verifyUserController = require('../Controllers/verifyFeature');

const jwtMiddleware = require('../Settings/checkAuthAdmin');

/**
* @swagger
* /api/v1/admin/users/{:Email}/verify:
*   patch:
*     security:
*        - bearerAuth: []
*     tags:
*       - Verifications, Approvals & Rejections
*     name: Admin Verify user
*     summary: Admin Verify user
*     parameters:
*       - name: ":Email"
*         in: path
*         description: Id of Loan
*         required: true
*         type: string
*     responses:
*       200:
*         description: Successfully Verified User
*/

verify.patch('/users/:Email/verify', jwtMiddleware, verifyUserController.verifyUser);

module.exports = verify;