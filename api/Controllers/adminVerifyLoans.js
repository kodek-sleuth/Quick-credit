/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable no-empty */
/* eslint-disable comma-dangle */

const models = require('../Models/models');

exports.verifyLoan = (req, res, next) => {
  const loanId = req.params.loanId;

  const result = new models.Loan().verifyLoan(loanId, res);

  res.status(200).json({
    Status: 200,
    Data: result,
    Success: 'Admin successfully approved loan for user'
  });
};

exports.rejectLoan = (req, res, next) => {
  const loanId = req.params.loanId;

  const result = new models.Loan().rejectLoan(loanId, res);

  res.status(200).json({
    Status: 200,
    Data: result,
    Success: 'Admin successfully rejected loan for user'
  });
};
