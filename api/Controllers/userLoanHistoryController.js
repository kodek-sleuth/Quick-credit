/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-restricted-globals */
/* eslint-disable eqeqeq */
/* eslint-disable no-empty */
/* eslint-disable comma-dangle */

import models from '../Models/models';

exports.viewLoanHistory = (req, res, next) => {
  const loanId = req.params.loanId;
  const result = new models.Repayment().getUserLoanHistory(loanId, res);

  res.status(200).json({
    Status: 200,
    Data: result,
    Success: 'All loan history successfully returned'
  });
};
