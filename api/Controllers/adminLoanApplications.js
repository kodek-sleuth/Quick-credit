/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */

const models = require('../Models/models');

exports.repaidLoans = (req, res, next) => {
  models.loans.forEach((loan) => {
    if (loan.Repaid == 'True') {
      res.status(200).json({
        Status: 200,
        Data: loan,
        Success: 'Successfully returned all loan applications'
      });
    }
  });
};

exports.unrepaidLoans = (req, res, next) => {
  models.loans.forEach((loan) => {
    if (loan.Repaid == 'False') {
      res.status(200).json({
        Status: 200,
        Data: loan,
        Success: 'Successfully returned all loan applications',
      });
    }
  });
};

exports.allLoans = (req, res, next) => {
  res.status(200).json({
    Status: 200,
    Data: models.loans,
    Success: 'Successfully returned all loan applications'
  });
};
