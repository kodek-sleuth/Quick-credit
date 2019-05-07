const express = require('express');

const payLoan = express.Router();

const payLoanController = require('../Controllers/repayLoanController');

// Middleware for checking Auth and Access Rights
const jwtMiddleware = require('../Settings/checkAuthUser');

/**
* @swagger
* /user/loans/repay:
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
*       - name: body
*         in: body
*         properties:
*           FullName:
*             type: string
*             example: Mugerwa Joseph
*           Email:
*             type: string
*             example: mugerwa@gmail.com
*           Amount:
*             type: integer
*             example: 500000
*         required:
*           - FullName
*           - Email
*           - Amount
*     responses:
*       201:
*         description: Successfully Placed Repayment
*       401:
*         description: Failed to process request, Try again later
*/

payLoan.post('/loans/repay', jwtMiddleware, payLoanController.repayLoan);

module.exports = payLoan;
