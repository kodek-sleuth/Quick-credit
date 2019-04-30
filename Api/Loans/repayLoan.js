const express = require('express');

const payLoan = express.Router();

const payLoanController = require('../Controllers/repayLoanController');

payLoan.post('/pay/loans', payLoanController.repayLoan);

module.exports = payLoan;
