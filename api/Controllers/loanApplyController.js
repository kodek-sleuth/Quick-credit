/* eslint-disable object-shorthand */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable no-empty */
/* eslint-disable comma-dangle */

const models = require('../Models/models');

exports.applyLoan = (req, res, next) => {
  const result = new models.Loan().validateLoanApplication(req.body, res);
  
  res.status(200).json({
    Success: 'Successfully applied for loan',
    Data: result,
    Status: 200
  });
};
