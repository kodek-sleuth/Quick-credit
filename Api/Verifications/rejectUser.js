const express = require('express');

const reject = express.Router();

const rejectUserController = require('../Controllers/verifyFeature');

const jwtMiddleware = require('../Settings/checkAuthAdmin');

/**
* @swagger
* /admin/users/{:Email}/reject:
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
*         description: Successfully Rejected User
*/

reject.patch('/:Email/reject', jwtMiddleware, rejectUserController.rejectUser);

module.exports = reject;
