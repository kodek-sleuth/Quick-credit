import express from 'express';

import payLoanController from '../Controllers/loanRepayController';

const payLoan = express.Router();

/**
* @swagger
* /api/v1/user/loans/{:loanId}/repayment:
*   post:
*     tags:
*       - User
*     name: Repay a Loan
*     summary: Reapy a Loan
*     consumes:
*       - application/json
*     parameters:
*       - name: ":loanId"
*         in: path
*         description: Id of Loan
*         required: true
*         type: integer
*       - name: body
*         in: body
*         properties:
*           Email:
*             type: string
*             example: mugerwa@gmail.com
*           Amount:
*             type: integer
*             example: 500000
*         required:
*           - Email
*           - Amount
*     responses:
*       201:
*         description: Successfully posted payment for loan
*       400:
*         description: Loan with that Id does not exist
*/

payLoan.post('/loans/:loanId/repayment', payLoanController.repayLoan);

module.exports = payLoan;
