/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */

import models from '../Models/models';

exports.repayLoan = (req, res, next) => {
  const loanId = req.params.loanId;

  const result = new models.Repayment().validateRepayment(req.body, res, loanId);
  res.status(201).json({
    Success: 'Successfully posted payment for loan',
    Data: result,
    Status: 201
  });
};
