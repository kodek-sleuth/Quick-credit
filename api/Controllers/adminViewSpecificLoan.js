/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable no-empty */
/* eslint-disable comma-dangle */

import models from '../Models/models';

exports.viewLoan = (req, res, next) => {
  const loanId = req.params.loanId;

  const result = new models.Loan().getSpecific(loanId, res);

  res.status(200).json({
    Status: 200,
    Data: result,
    Success: 'Loan has successfully been retrieved'
  });
};
