const express = require('express');

const postTransLoan = express.Router();

const jwtMiddleware = require('../Settings/checkAuth');

const postTransLoanController = require('../Controllers/adminPostTransactionController');

postTransLoan.patch('/loans/:loanId', jwtMiddleware, postTransLoanController.postTransaction);

module.exports = postTransLoan;
