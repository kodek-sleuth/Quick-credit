import express from 'express';

import rejectLoanController from '../Controllers/rejectLoanController';

const rejectLoan = express.Router();

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

rejectLoan.patch('/loans/:loanId/reject', rejectLoanController.rejectLoan);

module.exports = rejectLoan;
