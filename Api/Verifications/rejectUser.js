const express = require('express');

const reject = express.Router();

const rejectUserController = require('../Controllers/verifyFeature');

const jwtMiddleware = require('../Settings/checkAuthAdmin');

/**
* @swagger
* /api/v1/admin/users/{:Email}/reject:
*   patch:
*     security:
*        - bearerAuth: []
*     tags:
*       - Verifications, Approvals & Rejections
*     name: Admin Reject user
*     summary: Admin Reject user
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
