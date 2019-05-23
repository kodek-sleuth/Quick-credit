import express from 'express';

import payLoanController from '../Controllers/repayLoanController';

const payLoan = express.Router();

/**
* @swagger
* /api/v1/user/loans/{:loanId}/repayment:
*   post:
*     security:
*        - bearerAuth: []
*     tags:
*       - User
*     name: Repay a Loan
*     summary: Repay for a Loan
*     consumes:
*       - application/json
*     parameters:
*       - name: ":loanId"
*         in: path
*         description: Id of Loan
*         required: true
*         type: integer
*       - name: Amount
*         in: body
*         properties:
*           Amount:
*             type: integer
*             example: 500000
*         required:
*           - Amount
*     responses:
*       201:
*         description: Successfully placed repayment
*       401:
*         description: Failed to process request, Try again later
*/

payLoan.post('/loans/:loanId/repayment', payLoanController.repayLoan);

module.exports = payLoan;
