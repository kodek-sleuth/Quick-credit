const express = require('express');

const userLoans = express.Router();

const userLoansController = require('../Controllers/userLoansController');

userLoans.get('/:Email/loans', userLoansController.getLoansApplied);

userLoans.get('/:Email/loans/approved', userLoansController.getLoansApproved);

userLoans.get('/:Email/loans/rejected', userLoansController.getLoansRejected);

userLoans.get('/:Email/loans/repaid', userLoansController.getLoansRepaid);

userLoans.get('/:Email/loans/unrepaid', userLoansController.getLoansUnrepaid);

module.exports = userLoans;
