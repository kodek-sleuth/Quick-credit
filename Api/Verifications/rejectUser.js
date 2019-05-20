import express from 'express';

import rejectUserController from '../Controllers/verifyFeature';

import jwtMiddleware from '../Settings/checkAuthAdmin';

const reject = express.Router();

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
