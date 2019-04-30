const express = require('express');

const reqLoan = express.Router();

const reqLoanController = require('../Controllers/applyLoan');

reqLoan.post('/loans', reqLoanController.applyLoan);

module.exports = reqLoan;
