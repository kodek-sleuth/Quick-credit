const express = require('express');

const rejectLoan = express.Router();

const rejectLoanController = require('../Controllers/rejectLoanController');

const jwtMiddleware = require('../Settings/checkAuthAdmin');

/**
* @swagger
* /admin/loans/{:loanId}/reject:
*   patch:
*     security:
*        - bearerAuth: []
*     tags:
*       - Verifications, Approvals & Rejections
*     name: Admin Reject Loan for user
*     summary: Admin Reject Loan for user
*     parameters:
*       - name: ":loanId"
*         in: path
*         description: Id of Loan
*         required: true
*         type: integer
*     responses:
*       200:
*         description: Successfully Rejected Loan
*/

rejectLoan.patch('/loans/:loanId/reject', jwtMiddleware, rejectLoanController.rejectLoan);

module.exports = rejectLoan;
