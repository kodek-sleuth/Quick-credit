const express = require('express');

const approveLoan = express.Router();

const approveLoanController = require('../Controllers/approveLoanController');

approveLoan.patch('/loans/:loanId', approveLoanController.approveLoan);

module.exports = approveLoan;
