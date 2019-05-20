/* eslint-disable no-lonely-if */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */

import pg from 'pg';

const Pool = pg.Pool;

const connectionString = process.env.QUICK_CREDIT_DB;

const pool = new Pool({ connectionString: connectionString });

exports.repayLoan = (req, res, next) => {
  const makeRepaymentQuery = 'INSERT INTO repayments(loanId, investee_email, createdOn, paidamount, monthlyInstallment) VALUES($1, $2, $3, $4, $5)';

  // We first want to make sure that user exists in the Database
  pool.query(`SELECT * FROM users WHERE email='${req.body.Email}'`)
    .then((data) => {
      if (data.rowCount > 0) {
        const dataFetched = data.rows;

        // Since a repay will always be to that one unrepaid loan we may/many not user an id because a user will only have a loan after paying a new one
        pool.query(`SELECT * FROM loan WHERE investee_email='${dataFetched[0].email}' and repaid='False'`)
          .then((result) => {
            if (result.rowCount > 0) {
              const loanData = result.rows;

              // We make sure that the loan to be repaid has to first be approved else error
              if (loanData[0].status === 'Approved') {
                // We make sure that the user does not exceed a 20million limit
                if (req.body.Amount < 20000001) {
                  // We check if the existing loan is repaid or not, if repaid then this else we accept the repay
                  if (loanData[0].repaid === 'True') {
                    res.status(200).json({
                      Status: '200',
                      Data: {
                        Email: loanData[0].investee_email,
                        Firstname: loanData[0].investee_firstname,
                        Lastname: loanData[0].investee_lastname,
                        Paid: req.body.Amount,
                        Balance: loanData[0].balance,
                        Installment: loanData[0].paymentinstallment,
                      },
                      Repaid: 'True',
                    });
                  }

                  if (loanData[0].balance === 0.00) {
                    pool.query(`UPDATE loan set repaid='True' where id=${loanData[0].id}`)
                      .then((updateResult) => {
                      })
                      .catch((error) => {
                      });
                  } else {
                    // Now loan is unrepaid and user exists we now accept and track the repayment
                    const today = new Date();
                    const currentDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
                    const makeRepaymentQueryValues = [loanData[0].id, req.body.Email, currentDate, req.body.Amount, loanData[0].paymentinstallment];

                    pool.query(makeRepaymentQuery, makeRepaymentQueryValues)
                      .then((feedback) => {
                        // if Loan balance is less than zero we confirm that it is repaid
                        if (loanData[0].balance <= 0.00) {
                          pool.query(`UPDATE loan set repaid='True' where id=${loanData[0].id}`)
                            .then((result2) => {
                              res.status(200).json({
                                Status: '200',
                                Data: {
                                  Email: loanData[0].investee_email,
                                  Firstname: loanData[0].investee_firstname,
                                  Lastname: loanData[0].investee_lastname,
                                  Paid: req.body.Amount,
                                  Balance: loanData[0].balance,
                                  Installment: loanData[0].paymentinstallment,
                                },
                                Repaid: 'True',
                              });
                            })
                            .catch((errror) => {
                              res.status(401).json({
                                Status: '401',
                                Error: errror.message,
                              });
                            });
                        } else {
                          // Now -> Loan balance is not zero we can calculate and send back the balance to be paid
                          const newBalance = loanData[0].balance - req.body.Amount;
                          pool.query(`Update loan set balance='${newBalance}' where id=${loanData[0].id}`)
                            .then((updated) => {
                              // This is sending back the correct Updated details back to user
                              pool.query(`SELECT * FROM loan WHERE id=${loanData[0].id}`)
                                .then((currentData) => {
                                  if (currentData.rowCount > 0) {
                                    const updatedData = currentData.rows;

                                    if (updatedData[0].balance === 0.00) {
                                      res.status(201).json({
                                        Status: '201',
                                        Data: {
                                          Email: updatedData[0].investee_email,
                                          Firstname: updatedData[0].investee_firstname,
                                          Lastname: updatedData[0].investee_lastname,
                                          Amount: updatedData[0].amount,
                                          Paid: req.body.Amount,
                                          Balance: updatedData[0].balance,
                                          Repaid: 'True',
                                          Installment: updatedData[0].paymentinstallment,
                                        },
                                        Success: 'Successfully Placed Repayment',
                                      });
                                    } else {
                                      res.status(201).json({
                                        Status: '201',
                                        Data: {
                                          Email: updatedData[0].investee_email,
                                          Firstname: updatedData[0].investee_firstname,
                                          Lastname: updatedData[0].investee_lastname,
                                          Amount: updatedData[0].amount,
                                          Paid: req.body.Amount,
                                          Balance: updatedData[0].balance,
                                          Repaid: updatedData[0].repaid,
                                          Installment: updatedData[0].paymentinstallment,
                                        },
                                        Success: 'Successfully Placed Repayment',
                                      });
                                    }
                                  }
                                });
                            })
                            .catch((errr) => {
                              res.status(401).json({
                                Status: '401',
                                Error: errr.message,
                              });
                            });
                        }
                      })

                      .catch((error) => {
                        res.status(401).json({
                          Status: '401',
                          Error: error.message,
                        });
                      });
                  }
                }
              } else {
                res.status(401).json({
                  Status: '401',
                  Error: 'Loan has To be verified inorder to make repayment',
                });
              }
            }
          })

          .catch((err) => {
            res.status(401).json({
              Status: '401',
              Error: err.message,
            });
          });
      } else {
        res.status(401).json({
          Status: '401',
          Error: 'Signup to access resource',
        });
      }
    })

    .catch((err) => {
      res.status(401).json({
        Status: '401',
        Error: 'Failed to process request, Try again later',
      });
    });
};