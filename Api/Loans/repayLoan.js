const express = require('express');

const payLoan = express.Router();

const payLoanController = require('../Controllers/repayLoanController');

payLoan.post('/repay/loan', payLoanController.repayLoan);

module.exports = payLoan;
