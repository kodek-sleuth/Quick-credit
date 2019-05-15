const express = require('express');

const userHistory = express.Router();

const sp = require('../Controllers/userLoanHistoryController');

/**
* @swagger
* /api/v1/admin/loans/{:loanId}:
*   get:
*     tags:
*       - Loans
*     name: Gets A Specific Loan Repayment History in database
*     summary: Gets A Specific Loan Repayment History in database
*     parameters:
*       - name: ":loanId"
*         in: path
*         description: Id of Loan
*         required: true
*         type: integer
*     responses:
*       200:
*         description: Successfully Fetched History
*/

userHistory.get('/loans/:loanId/repayments', sp.viewLoan);
