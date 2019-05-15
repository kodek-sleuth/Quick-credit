/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-restricted-globals */
/* eslint-disable eqeqeq */
/* eslint-disable no-empty */
/* eslint-disable comma-dangle */

const models = require('../Models/models');

exports.viewLoanHistory = (req, res, next) => {
  const loanId = req.params.loanId;
  models.repayments.forEach((loan) => {
    if (loan.LoanId == loanId) {
      res.status(200).json({
        Status: 200,
        Data: loan,
        Success: 'Successfully returned loan History'
      });
    }
  });
};
