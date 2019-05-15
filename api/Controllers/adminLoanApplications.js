/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */

const models = require('../Models/models');

exports.repaidLoans = (req, res, next) => {
  const status = req.query.status;
  const repaid = req.query.repaid;

  const result = new models.Loan().showRepaid(status, repaid, res);

  res.status(200).json({
    Status: 200,
    Data: result,
    Success: 'All repaid loans returned'
  });
};

exports.unrepaidLoans = (req, res, next) => {
  const status = req.query.status;
  const repaid = req.query.repaid;

  const result = new models.Loan().showUnRepaid(status, repaid, res);

  res.status(200).json({
    Status: 200,
    Data: result,
    Success: 'All unrepaid loans successfully returned'
  });
};

exports.allLoans = (req, res, next) => {
  const result = new models.Loan().showAllLoans();

  res.status(200).json({
    Status: 200,
    Data: result,
    Success: 'All loans successfully returned'
  });
};
