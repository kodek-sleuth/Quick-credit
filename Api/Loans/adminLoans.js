const express = require('express');

const adminLoans = express.Router();

const adminLoansController = require('../Controllers/adminLoansController');

const jwtMiddleware = require('../Settings/checkAuthAdmin');

adminLoans.get('/users', jwtMiddleware, adminLoansController.getAllUsers);

adminLoans.get('/users/pending', jwtMiddleware, adminLoansController.getUsersPending);

adminLoans.get('/users/verified', jwtMiddleware, adminLoansController.getUsersVerified);

adminLoans.get('/loans', jwtMiddleware, adminLoansController.getAllLoans);

adminLoans.get('/loans/approved', jwtMiddleware, adminLoansController.getLoansApproved);

adminLoans.get('/loans/pending', jwtMiddleware, adminLoansController.getAllLoansPending);

adminLoans.get('/loans/rejected', jwtMiddleware, adminLoansController.getLoansRejected);

adminLoans.get('/loans/repaid', jwtMiddleware, adminLoansController.getLoansRepaid);

adminLoans.get('/loans/unrepaid', jwtMiddleware, adminLoansController.getLoansUnrepaid);

adminLoans.get('/loans/:loanId', jwtMiddleware, adminLoansController.getSpecificLoan);

module.exports = adminLoans;
