import express from 'express';

import adminLoansController from '../Controllers/adminLoansController';

// Middleware for checking Auth and Access Rights
import jwtMiddleware from '../Settings/checkAuthAdmin';

const adminLoans = express.Router();

/**
* @swagger
* /api/v1/admin/loans:
*   get:
*     security:
*        - bearerAuth: []
*     tags:
*       - Loans
*     name: Gets All Loans in database
*     summary: Gets All Loans in database
*     responses:
*       200:
*         description: Successfully Fetched Loans
*/

adminLoans.get('/loans', jwtMiddleware, adminLoansController.getAllLoans);

/**
* @swagger
* /api/v1/admin/loans/repaid:
*   get:
*     security:
*        - bearerAuth: []
*     tags:
*       - Loans
*     name: Gets All Repaid Loans in database
*     summary: Gets All Repaid Loans in database
*     responses:
*       200:
*         description: Successfully Fetched Loans
*/

adminLoans.get('/loans/repaid?status=Approved&repaid=True', jwtMiddleware, adminLoansController.getLoansRepaid);

/**
* @swagger
* /api/v1/admin/loans/unrepaid:
*   get:
*     security:
*        - bearerAuth: []
*     tags:
*       - Loans
*     name: Gets All Unrepaid Loans in database
*     summary: Gets All Unrepaid Loans in database
*     responses:
*       200:
*         description: Successfully Fetched Loans
*/

adminLoans.get('/loans/unrepaid?status=Approved&repaid=False', jwtMiddleware, adminLoansController.getLoansUnrepaid);

/**
* @swagger
* /api/v1/admin/loans/{:loanId}:
*   get:
*     security:
*        - bearerAuth: []
*     tags:
*       - Loans
*     name: Gets A Specific Loan in database
*     summary: Gets A Specific Loan in database
*     parameters:
*       - name: ":loanId"
*         in: path
*         description: Id of Loan
*         required: true
*         type: integer
*     responses:
*       200:
*         description: Successfully Fetched Loan
*/

adminLoans.get('/loans/:loanId', jwtMiddleware, adminLoansController.getSpecificLoan);

module.exports = adminLoans;
