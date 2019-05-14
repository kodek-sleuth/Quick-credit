const express = require('express');

const adminLoans = express.Router();

const adminLoansController = require('../Controllers/adminLoanApplications');

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

adminLoans.get('/admin/loans', adminLoansController.allLoans);

// Swagger documentation
/**
* @swagger
* /api/v1/admin/loans/unrepaid:
*   get:
*     tags:
*       - Admin
*     name: Gets All Unrepaid Loans in database
*     summary: Gets All Unrepaid Loans in database
*     responses:
*       200:
*         description: Successfully Fetched Loans
*/

adminLoans.get('/admin/loans/unrepaid', adminLoansController.unrepaidLoans);

// Swagger documentation
/**
* @swagger
* /api/v1/admin/loans/repaid:
*   get:
*     tags:
*       - Admin
*     name: Gets All Repaid Loans in database
*     summary: Gets All Repaid Loans in database
*     responses:
*       200:
*         description: Successfully Fetched Loans
*/

adminLoans.get('/admin/loans/repaid', adminLoansController.repaidLoans);
