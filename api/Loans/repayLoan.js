const express = require('express');

const payLoan = express.Router();

const payLoanController = require('../Controllers/loanRepayController');

/**
* @swagger
* /api/v1/loans/:loanId/repayment:
*   post:
*     tags:
*       - User
*     name: Repay a Loan
*     summary: Reapy a Loan
*     consumes:
*       - application/json
*     parameters:
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
*         description: Customer Successfully Signed Up
*       500:
*         description: Failed To Authenticate
*/


payLoan.post('/loans/:loanId/repayment', payLoanController.repayLoan);

module.exports = payLoan;
