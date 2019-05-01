const express = require('express');

const postTransLoan = express.Router();

const postTransLoanController = require('../Controllers/adminPostTransactionController');

postTransLoan.patch('/loans/:loanId', postTransLoanController.postTransaction);

module.exports = postTransLoan;
