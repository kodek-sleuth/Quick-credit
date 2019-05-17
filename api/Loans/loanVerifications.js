import express from 'express';

import verifyLoanController from '../Controllers/adminVerifyLoans';

const verifyLoan = express.Router();


/**
* @swagger
* /api/v1/admin/loans/{:loanId}/approve:
*   patch:
*     tags:
*       - Verifications, Approvals & Rejections
*     name: Admin Approve Loan
*     summary: Admin Approves Loan
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
