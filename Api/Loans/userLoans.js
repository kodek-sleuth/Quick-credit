import express from 'express';

import userLoansController from '../Controllers/userLoansController';

const userLoans = express.Router();

/**
* @swagger
* /api/v1/user/{:Email}/loans:
*   get:
*     tags:
*       - User
*     name: Gets All User's loans in database
*     summary: Gets All User's loans in database
*     parameters:
*       - name: ":Email"
*         in: path
*         description: Email Id of Loan
*         required: true
*         type: string
*     responses:
*       200:
*         description: Successfully Fetched Loans
*/

userLoans.get('/:Email/loans', userLoansController.getLoansApplied);

/**
* @swagger
* /api/v1/user/{:Email}/loans/approved:
*   get:
*     security:
*        - bearerAuth: []
*     tags:
*       - User
*     name: Gets All User's Approved loans in database
*     summary: Gets All User's Approved loans in database
*     parameters:
*       - name: ":Email"
*         in: path
*         description: Email Id of Loan
*         required: true
*         type: string
*     responses:
*       200:
*         description: Successfully Fetched Loans
*/

userLoans.get('/:Email/loans/approved', userLoansController.getLoansApproved);

/**
* @swagger
* /api/v1/user/{:Email}/loans/rejected:
*   get:
*     security:
*        - bearerAuth: []
*     tags:
*       - User
*     name: Gets All User's Rejected loans in database
*     summary: Gets All User's Rejected loans in database
*     parameters:
*       - name: ":Email"
*         in: path
*         description: Email Id of Loan
*         required: true
*         type: string
*     responses:
*       200:
*         description: Successfully Fetched Loans
*/

userLoans.get('/:Email/loans/rejected', userLoansController.getLoansRejected);

/**
* @swagger
* /api/v1/user/{:Email}/loans/repaid:
*   get:
*     security:
*        - bearerAuth: []
*     tags:
*       - User
*     name: Gets All User's Repaid loans in database
*     summary: Gets All User's Repaid loans in database
*     parameters:
*       - name: ":Email"
*         in: path
*         description: Email Id of Loan
*         required: true
*         type: string
*     responses:
*       200:
*         description: Successfully Fetched Loans
*/

userLoans.get('/:Email/loans/repaid', userLoansController.getLoansRepaid);

/**
* @swagger
* /api/v1/user/{:Email}/loans/unrepaid:
*   get:
*     security:
*        - bearerAuth: []
*     tags:
*       - User
*     name: Gets All User's Unrepaid loans in database
*     summary: Gets All User's Unrepaid loans in database
*     parameters:
*       - name: ":Email"
*         in: path
*         description: Email Id of Loan
*         required: true
*         type: string
*     responses:
*       200:
*         description: Successfully Fetched Loans
*/

userLoans.get('/:Email/loans/unrepaid', userLoansController.getLoansUnrepaid);


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

userLoans.get('/:Email/loans/:loanId/repayments', userLoansController.getLoanRepayments);

module.exports = userLoans;
