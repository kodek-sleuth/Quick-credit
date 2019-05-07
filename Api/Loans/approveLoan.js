const express = require('express');

const approveLoan = express.Router();

const approveLoanController = require('../Controllers/approveLoanController');

const jwtMiddleware = require('../Settings/checkAuthAdmin');

/**
* @swagger
* /api/v1/admin/loans/{:loanId}/approve:
*   patch:
*     security:
*        - bearerAuth: []
*     tags:
*       - Verifications, Approvals & Rejections
*     name: Approve Loan
*     summary: Approves Loan
*     parameters:
*       - name: ":loanId"
*         in: path
*         description: Id of Loan
*         required: true
*         type: integer
*     responses:
*       201:
*         description: Successfully Applied For Loan
*       401:
*         description: Failed to process request, Try again later
*/

approveLoan.patch('/loans/:loanId/approve', jwtMiddleware, approveLoanController.approveLoan);

module.exports = approveLoan;
