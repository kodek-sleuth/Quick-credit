/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-curly-spacing */
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

exports.repayLoan = (req, res, next) => {
    const loanId = req.params.loanId;
    
    if (req.body.Email == null || req.body.Fullname == null || req.body.Amount == null)
    {
        res.status(400).json({
            Status: 400,
            Error: 'Email, Fullname and Amount fields are required'
        });
    }

    if (isNaN(req.body.Email) == false || isNaN(req.body.Fullname) == false || isNaN(req.body.Amount) == true || isNaN(loanId) == true)
    {
        res.status(400).json({
            Status: 400,
            Error: 'Email and Fullname should be String while Amount and id are Integers'
        });
    }

    else
    {
        models.loans.forEach((loan) => {
            if (loan.Email == req.body.Email && loan.Fullname == req.body.Fullname)
            {
                if (loan.id == loanId)
                {
                    if (loan.Repaid == 'True')
                    {
                        res.status(400).json({
                            Status: 400,
                            Error: 'Loan has already been repayed'
                        });
                    }

                    if (loan.Repaid == 'False')
                    {
                        if (loan.Status == 'Verified')
                        {
                            const today = new Date();

                            const currentDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    
                            if (req.body.Amount > loan.Balance)
                            {
                                res.status(200).json({
                                    Status: 200,
                                    Error: 'Please repay exact balance'
                                });
                            }
    
                            else
                            {
                                const newRepayment = {
                                    id: req.body.id,
                                    Email: loan.Email,
                                    Fullname: loan.Email,
                                    Amount: loan.Amount,
                                    Paid: req.body.Amount,
                                    PayedOn: currentDate
                                };
                                
                                models.repayments.push(newRepayment);
        
                                const newBalance = req.body.Amount - loan.Balance;
                                loan.Balance = newBalance;
    
                                res.status(201).json({
                                    Status: 201,
                                    Data: {
                                        id: req.body.loanId,
                                        Fullname: req.body.Fullname,
                                        Email: req.body.Email,
                                        Amount: loan.Amount,
                                        Tenor: loan.Tenor,
                                        Balance: loan.Balance,
                                        Interest: loan.Interest,
                                        Installment: loan.Installment,
                                        Repaid: loan.Repaid,
                                        Status: loan.Status,
                                        CreatedOn: loan.CreatedOn
                                    }
                                });
                            }
                        }

                        else
                        {
                            res.status(400).json({
                                Status: 400,
                                Error: 'Loan has to be Verified inorder to post payment'
                            });
                        }
                    }
                }

                else
                {
                    res.status(400).json({
                        Status: 400,
                        Error: 'Invalid Loan Id'
                    });
                }
            }

            else
            {
                res.status(400).json({
                    Status: 400,
                    Error: 'Please Singup to use resource'
                });
            }
        });
    }

};
