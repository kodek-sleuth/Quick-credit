const express = require('express');

const verifyLoan = express.Router();

const verifyLoanController = require('../Controllers/adminVerifyLoans');


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

verifyLoan.patch('/loans/:loanId/approve', verifyLoanController.verifyLoan);

/**
* @swagger
* /api/v1/admin/loans/{:loanId}/reject:
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

verifyLoan.patch('/loans/:loanId/reject', verifyLoanController.rejectLoan);

module.exports = verifyLoan;
