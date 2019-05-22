import express from 'express';

import payLoanController from '../Controllers/repayLoanController';

import jwtMiddleware from '../Settings/checkAuthUser';

const payLoan = express.Router();

/**
* @swagger
* /api/v1/user/loans/repay:
*   post:
*     tags:
*       - User
*     name: Repay a Loan
*     summary: Repay for a Loan
*     consumes:
*       - application/json
*     parameters:
*       - name: body
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

payLoan.post('/loans/:loanId/repayment', jwtMiddleware, payLoanController.repayLoan);

module.exports = payLoan;
