/* eslint-disable no-lonely-if */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable brace-style */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable indent */

const jwt = require('jsonwebtoken');

const Pool = require('pg').Pool;

const connectionString = process.env.QUICK_CREDIT_DB;

const pool = new Pool({ connectionString: connectionString });

exports.applyLoan = (req, res, next) => {
    const queryReqLoan = 'INSERT INTO loan(investee_email, investee_name, createdOn, tenor, amount, paymentInstallment, balance, interest) VALUES($1, $2, $3, $4, $5, $6, $7, $8)';

    pool.query(`Select * from users WHERE email='${req.body.Email}' and fullname='${req.body.Fullname}'`)
    .then((data) => {
        if (data.rowCount > 0)
        {
            const dataFetched = data.rows;
            
            if (dataFetched[0].status == 'Verified')
            {
                pool.query(`Select * from loan WHERE investee_email='${req.body.Email}' and investee_name='${req.body.Fullname}'`)
                .then((loanData) => {
                    if (loanData.rowCount >= 0)
                    {
                        const userLoanData = loanData.rows;

                        userLoanData.forEach((loan) => {
                            if (loan.repaid == 'False')
                            {
                                res.status(401).json({
                                    Status: '401',
                                    Error: 'Please repay old loan before applying for a new one'
                                });
                            }

                            else
                            {
                                if (req.body.tenor > 12)
                                {
                                    res.status(401).json({
                                        Status: '401',
                                        Error: 'Tenor must be 12 or less'
                                    });
                                }

                                else 
                                {
                                    if (req.body.Amount > 20000000)
                                    {
                                        res.status(401).json({
                                            Status: '401',
                                            Error: 'User can only request for a loan less than 20,000,001'
                                        });
                                    }

                                    else
                                    {
                                        // 
                                        
                                        const today = new Date();

                                        const currentDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

                                        const balance = 0.00;
                                        const interest = (5 * req.body.Amount) / 100;
                                        const paymentInstallment = (req.body.Amount + interest) / req.body.Tenor;
                                        
                                        const queryReqValues = [req.body.Email, req.body.Fullname, currentDate, req.body.Tenor, req.body.Amount, paymentInstallment, balance, interest];
                                    
                                        pool.query(queryReqLoan, queryReqValues)
                                        .then(() => {

                                        })
                                        .catch(() => {

                                        });
                                    }
                                }
                            }
                        });
                    }
                })

                .catch((err) => {

                });
            }

            else
            {
                res.status(401).json({
                    Status: '401',
                    Error: 'User must be Verified To make this request'
                });
            }
        }

        else
        {
            res.status(401).json({
                Status: '401',
                Error: 'Failed to process request, Try agian later'
            });
        }
    })
    .catch((error) => {
        res.status(401).json({
            Status: '401',
            Error: error.message
        });
    });
};
