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

exports.transacPost = {
    const loanId = req.params.loanId;

    if (loanId)
    {
        models.loans.forEach((loan) => {
            if (loan.id == loanId)
            {
                loan.Balance = '0';
                loan.Repaid = 'True';
                loan.Status = 'Verified'

                res.status(200).json({
                    Status: 200,
                    Success: 'Successfully posted transaction for user',
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
                })
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
}