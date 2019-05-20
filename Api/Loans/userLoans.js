import express from 'express';

import userLoansController from '../Controllers/userLoansController';

const userLoans = express.Router();

/**
* @swagger
* /api/v1/user/{:Email}/loans/{:loanId}/repayments:
*   get:
*     security:
*        - bearerAuth: []
*     tags:
*       - User
*     name: Gets All User's Repayments of that Loan in database
*     summary: Gets All User's  Repayments of that Loan in database
*     parameters:
*       - name: ":Email"
*         in: path
*         description: Email Id of Loan
*         required: true
*         type: string
*       - name: ":loanId"
*         in: path
*         description: Id of Loan
*         required: true
*         type: integer
*     responses:
*      200:
*       description: Successfully Fetched Repayments
*/

userLoans.get('/loans/:loanId/repayments', userLoansController.getLoanRepayments);

module.exports = userLoans;
