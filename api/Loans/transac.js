import express from 'express';

import transacController from '../Controllers/adminTransacController';

const transacLoan = express.Router();

/**
* @swagger
* /api/v1/admin/loans/{:loanId}/transac:
*   patch:
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
*         description: Successfully posted transaction for user
*       400:
*         description: Loan with that Id does not exist
*/

transacLoan.patch('/loans/:loanId/transac', transacController.transacPost);

module.exports = transacLoan;
