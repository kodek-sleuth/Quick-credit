import express from 'express';

import adminLoansController from '../Controllers/adminLoansController';

// Middleware for checking Auth and Access Rights
import jwtMiddleware from '../Settings/checkAuthAdmin';

const adminLoans = express.Router();

// Swagger documentation
/**
* @swagger
* /api/v1/admin/users:
*   get:
*     security:
*        - bearerAuth: []
*     tags:
*       - Admin
*     name: Gets All Users in database
*     summary: Gets All Users in database
*     responses:
*       200:
*         description: Successfully Fetched Users
*/

adminLoans.get('/users', jwtMiddleware, adminLoansController.getAllUsers);

/**
* @swagger
* /api/v1/admin/users/pending:
*   get:
*     security:
*        - bearerAuth: []
*     tags:
*       - Admin
*     name: Gets All Pending Users in database
*     summary: Gets All Pending Users in database
*     responses:
*       200:
*         description: Successfully Fetched Users
*/

adminLoans.get('/users/pending', jwtMiddleware, adminLoansController.getUsersPending);

/**
* @swagger
* /api/v1/admin/users/verified:
*   get:
*     security:
*        - bearerAuth: []
*     tags:
*       - Admin
*     name: Gets All Verified Users in database
*     summary: Gets All Verified Users in database
*     responses:
*       200:
*         description: Successfully Fetched Users
*/

adminLoans.get('/users/verified', jwtMiddleware, adminLoansController.getUsersVerified);

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
* /api/v1/admin/loans/approved:
*   get:
*     security:
*        - bearerAuth: []
*     tags:
*       - Loans
*     name: Gets All Approved Loans in database
*     summary: Gets All Approved Loans in database
*     responses:
*       200:
*         description: Successfully Fetched Loans
*/

adminLoans.get('/loans/approved', jwtMiddleware, adminLoansController.getLoansApproved);

/**
* @swagger
* /api/v1/admin/loans/pending:
*   get:
*     security:
*        - bearerAuth: []
*     tags:
*       - Loans
*     name: Gets All Pending Loans in database
*     summary: Gets All Pending Loans in database
*     responses:
*       200:
*         description: Successfully Fetched Loans
*/

adminLoans.get('/loans/pending', jwtMiddleware, adminLoansController.getAllLoansPending);

/**
* @swagger
* /api/v1/admin/loans/rejected:
*   get:
*     security:
*        - bearerAuth: []
*     tags:
*       - Loans
*     name: Gets All Rejected Loans in database
*     summary: Gets All Rejected Loans in database
*     responses:
*       200:
*         description: Successfully Fetched Loans
*/

adminLoans.get('/loans/rejected', jwtMiddleware, adminLoansController.getLoansRejected);

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

adminLoans.get('/loans/repaid', jwtMiddleware, adminLoansController.getLoansRepaid);

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

adminLoans.get('/loans/unrepaid', jwtMiddleware, adminLoansController.getLoansUnrepaid);

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
