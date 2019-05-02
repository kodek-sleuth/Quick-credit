const express = require('express');

const approveLoan = express.Router();

const approveLoanController = require('../Controllers/approveLoanController');

const jwtMiddleware = require('../Settings/checkAuth');

approveLoan.patch('/loans/:loanId/approve', jwtMiddleware, approveLoanController.approveLoan);

module.exports = approveLoan;
