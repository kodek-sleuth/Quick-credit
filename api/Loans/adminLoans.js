import express from 'express';

import adminLoansController from '../Controllers/adminLoanApplications';

import sp from '../Controllers/adminViewSpecificLoan';

const adminLoans = express.Router();

// Swagger documentation
/**
* @swagger
* /api/v1/admin/loans:
*   get:
*     tags:
*       - Admin
*     name: Gets All Loans in database
*     summary: Gets All Loans in database
*     responses:
*       200:
*         description: Successfully Fetched Loans
*/

adminLoans.get('/loans', adminLoansController.allLoans);

// Swagger documentation
/**
* @swagger
* /api/v1/admin/loans/unrepaid?status=Approved&repaid=False:
*   get:
*     tags:
*       - Admin
*     name: Gets All Unrepaid Loans in database
*     summary: Gets All Unrepaid Loans in database
*     responses:
*       200:
*         description: Successfully Fetched Loans
*/

adminLoans.get('/loans/unrepaid', adminLoansController.unrepaidLoans);

// Swagger documentation
/**
* @swagger
* /api/v1/admin/loans/repaid?status=Approved&repaid=True:
*   get:
*     tags:
*       - Admin
*     name: Gets All Repaid Loans in database
*     summary: Gets All Repaid Loans in database
*     responses:
*       200:
*         description: Successfully Fetched Loans
*/

adminLoans.get('/loans/repaid', adminLoansController.repaidLoans);

/**
* @swagger
* /api/v1/admin/loans/{:loanId}:
*   get:
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

adminLoans.get('/loans/:loanId', sp.viewLoan);

module.exports = adminLoans;
