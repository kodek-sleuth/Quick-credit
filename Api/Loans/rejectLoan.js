const express = require('express');

const rejectLoan = express.Router();

const rejectLoanController = require('../Controllers/rejectLoanController');

const jwtMiddleware = require('../Settings/checkAuth');

rejectLoan.patch('/loans/:loanId/reject', jwtMiddleware, rejectLoanController.rejectLoan);

module.exports = rejectLoan;
