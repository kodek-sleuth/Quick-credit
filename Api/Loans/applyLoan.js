const express = require('express');

const reqLoan = express.Router();

const reqLoanController = require('../Controllers/applyLoanController');

reqLoan.post('/req/loan', reqLoanController.applyLoan);

module.exports = reqLoan;
