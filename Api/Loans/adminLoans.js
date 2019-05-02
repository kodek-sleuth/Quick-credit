const express = require('express');

const adminLoans = express.Router();

const adminLoansController = require('../Controllers/adminLoansController');

adminLoans.get('/users', adminLoansController.getAllUsers);

adminLoans.get('/users/pending', adminLoansController.getUsersPending);

adminLoans.get('/users/verified', adminLoansController.getUsersVerified);

adminLoans.get('/loans', adminLoansController.getAllLoans);

adminLoans.get('/loans/approved', adminLoansController.getLoansApproved);

adminLoans.get('/loans/pending', adminLoansController.getAllLoansPending);

adminLoans.get('/loans/rejected', adminLoansController.getLoansRejected);

adminLoans.get('/loans/repaid', adminLoansController.getLoansRepaid);

adminLoans.get('/loans/unrepaid', adminLoansController.getLoansUnrepaid);

adminLoans.get('/loans/:loanId', adminLoansController.getSpecificLoan);

module.exports = adminLoans;
