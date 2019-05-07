const express = require('express');

const userLoans = express.Router();

const userLoansController = require('../Controllers/userLoansController');

/**
* @swagger
* /api/v1/user/{:Email}/loans:
*   get:
*     security:
*        - bearerAuth: []
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

module.exports = userLoans;
