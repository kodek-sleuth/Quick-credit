/* eslint-disable radix */
/* eslint-disable comma-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */

import models from '../Models/models';

exports.transacPost = (req, res, next) => {
  const loanId = req.params.loanId;

  const result = new models.Loan().adminPostTransaction(loanId, res);

  res.status(200).json({
    Status: 200,
    Data: result,
    Success: 'Admin successfully posted loan for user'
  });
};
