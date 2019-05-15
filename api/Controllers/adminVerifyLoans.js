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

  if (loanId) {
    models.loans.forEach((loan) => {
      if (loan.LoanId == loanId) {
        loan.Status = 'Verified';

        res.status(200).json({
          Status: 200,
          Success: 'Successfully verified loan for user',
          Data: {
            Id: loan.LoanId,  
            Email: loan.Email,
            Amount: loan.Amount,
            Tenor: loan.Tenor,
            Balance: loan.Balance,
            Interest: loan.Interest,
            Installment: loan.Installment,
            Repaid: loan.Balance,
            Status: loan.Status,
            CreatedOn: loan.CreatedOn
          }
        });
      } else {
        res.status(400).json({
          Status: 400,
          Error: 'Loan with that id does not exist'
        });
      }
    });
  }
};

exports.rejectLoan = (req, res, next) => {
  const loanId = req.params.loanId;

  if (loanId) {
    models.loans.forEach((loan) => {
      if (loan.LoanId == loanId) {
        loan.Status = 'Rejected';

        res.status(200).json({
          Status: 200,
          Success: 'Successfully rejected loan for user',
          Data: {
            Id: loan.LoanId,
            Email: loan.Email,
            Amount: loan.Amount,
            Tenor: loan.Tenor,
            Balance: loan.Balance,
            Interest: loan.Interest,
            Installment: loan.Installment,
            Repaid: loan.Balance,
            Status: loan.Status,
            CreatedOn: loan.CreatedOn
          }
        });
      } else {
        res.status(400).json({
          Status: 400,
          Error: 'Loan with that id does not exist'
        });
      }
    });
  }
};
