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
    const makeRepaymentQuery = 'INSERT INTO repayments(loanId, investee_email, investee_name, createdOn, amount, paidAmount, monthlyInstallment) VALUES($1, $2, $3, $4, $5, $6, $7)';
  
    pool.query(`SELECT * FROM users WHERE email='${req.body.Email}' and fullname='${req.body.Fullname}'`)
    .then((data) => {
        if (data.rowCount > 0)
        {
            const dataFetched = data.rows;

            pool.query(`SELECT * FROM loan WHERE investee_email='${dataFetched[0].email}' and investee_name='${dataFetched[0].fullname}' and repaid='False'`)
            .then((result) => {
                if (result.rowCount > 0)
                {
                    const loanData = result.rows;
                    console.log(loanData);

                    if (loanData[0].status == 'Approved')
                    {
                        if (req.body.Amount < 20000001)
                        {
                            if (loanData[0].repaid == 'True')
                            {
                                res.status(200).json({
                                    Status: '200',
                                    Data: {
                                        Email: loanData[0].investee_email,
                                        Fullname: loanData[0].investee_name,
                                        Paid: req.body.Amount,
                                        Balance: loanData[0].balance,
                                        Installment: loanData[0].paymentinstallment
                                    },
                                    Repaid: 'True'
                                });
                            }
    
                            else
                            {        
                                const today = new Date();
                                const currentDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
                                const makeRepaymentQueryValues = [loanData[0].id, req.body.Email, req.body.Fullname, currentDate, loanData[0].amount, req.body.Amount, loanData[0].paymentinstallment];
                                pool.query(makeRepaymentQuery, makeRepaymentQueryValues)
                                .then((feedback) => {
                                    if (loanData[0].balance <= 0.00)
                                    {
                                        pool.query(`UPDATE loan set repaid='True' where id=${loanData[0].id}`)
                                        .then((result2) => {
                                            res.status(200).json({
                                                Status: '200',
                                                Data: {
                                                    Email: loanData[0].investee_email,
                                                    Fullname: loanData[0].investee_name,
                                                    Paid: req.body.Amount,
                                                    Balance: loanData[0].balance,
                                                    Installment: loanData[0].paymentinstallment
                                                },
                                                Repaid: 'True'
                                            });
                                        })
                                        .catch((errror) => {
                                            res.status(401).json({
                                                Status: '401',
                                                Error: errror.message
                                            }); 
                                        });
                                    }
    
                                    else
                                    {
                                        const newBalance = loanData[0].balance - req.body.Amount;
                                        pool.query(`Update loan set balance='${newBalance}' where id=${loanData[0].id}`)
                                        .then((updated) => {
                                            pool.query(`SELECT * FROM loan WHERE id=${loanData[0].id}`)
                                            .then((currentData) => {
                                                if (currentData.rowCount > 0)
                                                {
                                                    const updatedData = currentData.rows;
                                                    
                                                    res.status(201).json({
                                                        Status: '201',
                                                        Data: {
                                                            Email: updatedData[0].investee_email,
                                                            Fullname: updatedData[0].investee_name,
                                                            Amount: updatedData[0].amount,
                                                            Paid: req.body.Amount,
                                                            Balance: updatedData[0].balance,
                                                            Repaid: updatedData[0].repaid,
                                                            Installment: updatedData[0].paymentinstallment
                                                        },
                                                        Success: 'Successfully Placed Repayment'
                                                    });     
                                                }     
                                            });
                                        })
                                        .catch((errr) => {
                                            res.status(401).json({
                                                Status: '401',
                                                Error: errr.message
                                            }); 
                                        });
                                    }
                                })
    
                                .catch((error) => {
                                    res.status(401).json({
                                        Status: '401',
                                        Error: error.message
                                    });     
                            });
                        }
                    }
                }

                else
                {
                    res.status(401).json({
                        Status: '401',
                        Error: 'Please Loan Has to be verified inorder to make Repayment' 
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
