const express = require('express');

const rejectLoan = express.Router();

const rejectLoanController = require('../Controllers/rejectLoanController');

rejectLoan.patch('/loans/:loanId/reject', rejectLoanController.rejectLoan);

module.exports = rejectLoan;
