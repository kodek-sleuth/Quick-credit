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

const Pool = require('pg').Pool;

const connectionString = process.env.QUICK_CREDIT_DB;

const pool = new Pool({ connectionString: connectionString });

exports.repayLoan = (req, res, next) => {
    const makeRepaymentQuery = 'INSERT INTO repayments(loanId, investee_email, investee_name, createdOn, paidAmount, monthlyInstallment) VALUES($1, $2, $3, $4, $5, $6)';
  
    pool.query(`SELECT * FROM users WHERE email='${req.body.Email}' and fullname='${req.body.Fullname}'`)
    .then((data) => {
        if (data.rowCount > 0)
        {
            const dataFetched = data.rows;

            pool.query(`SELECT * FROM loan WHERE investee_email='${dataFetched[0].email} and investee_name='${dataFetched[0].fullname}' and repaid='False'`)
            .then((result) => {
                if (result.rowCount > 0)
                {
                    const loanData = result.rows;

                    if (req.body.Amount < 20000001)
                    {
                        const makeRepaymentQueryValues = [loanData[0].loanId, req.body.Email, req.body.Fullname, currentDate, loanData[0].amount, req.body.Installment]
                        
                        pool.query(makeRepaymentQuery, makeRepaymentQueryValues)
                        .then((feedback) => {
                            console.log(feedback);
                            res.status(201).json({
                                Status: 201,
                                Success: 'Successfully Posted Loan Payment'
                            });
                        })

                        .catch((error) => {
                            res.status(401).json({
                                Status: '401',
                                Error: error
                            });     
                        });
                    }

                    else
                    {
                        res.status(401).json({
                            Status: '401',
                            Error: `Please pay the exact agreed on Installment of shs ${loanData[0].paymentInstallment}` 
                        });
                    }
                }
            })

            .catch((err) => {
                res.status(401).json({
                    Status: '401',
                    Error: err.message
                });
            });
        }

        else
        {
            res.status(401).json({
            Status: '401',
            Error: 'Signup or Login To access resource' 
          });
        }
    })

    .catch((err) => {
        res.status(401).json({
            Status: '401',
            Error: 'Failed to process request, Try again later'
        });
    });
};
