/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable indent */
/* eslint-disable no-restricted-globals */
/* eslint-disable brace-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable no-empty */
/* eslint-disable comma-dangle */

const models = require('../Models/models');

exports.verifyLoan = (req, res, next) => {
    const loanId = req.params.loanId;

    if (loanId)
    {
        models.loans.forEach((loan) => {
            if (loan.id == loanId)
            {
                loan.Status = 'Verified';

                res.status(200).json({
                    Status: 200,
                    Success: 'Successfully verified loan for user',
                    Data: {
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
            }

            else
            {
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

    if (loanId)
    {
        models.loans.forEach((loan) => {
            if (loan.id == loanId)
            {
                loan.Status = 'Rejected';

                res.status(200).json({
                    Status: 200,
                    Success: 'Successfully rejected loan for user',
                    Data: {
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
            }

            else
            {
                res.status(400).json({
                    Status: 400,
                    Error: 'Loan with that id does not exist'
                  });
            }
        });
    }
};
