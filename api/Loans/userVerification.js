
const express = require('express');

const verify = express.Router();

const verifyUserController = require('../Controllers/userVerification');


/**
* @swagger
* /api/v1/admin/users/{:Email}/verify:
*   patch:
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

verify.patch('/users/:userEmail/verify', verifyUserController.verifyUser);

module.exports = verify;
