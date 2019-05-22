/* eslint-disable eqeqeq */
/* eslint-disable no-lonely-if */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */

import jwt from 'jsonwebtoken';

import model from './databaseController';

import config from '../../config';

exports.repayLoan = (req, res, next) => {
  const makeRepaymentQuery = 'INSERT INTO repayments(loanId, createdOn, amount, monthlyInstallment) VALUES($1, $2, $3, $4)';
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, config.secret);
    const emailId = decode.Email;
    const userId = decode.id;
    // We first want to make sure that user exists in the Database
    model.pool.query(`SELECT * FROM users WHERE email='${emailId}'`)
      .then((data) => {
        if (data.rowCount > 0) {
          const dataFetched = data.rows;

          // Since a repay will always be to that one unrepaid loan we may/many not user an id because a user will only have a loan after paying a new one
          model.pool.query(`select loan.status, loan.paymentinstallment, loan.balance, loan.id, users.firstname, users.email, users.lastname from loan join users on userid=${userId} where repaid='False'`)
            .then((result) => {
              if (result.rowCount > 0) {
                const loanData = result.rows;

                // We make sure that the loan to be repaid has to first be approved else error
                if (loanData[0].status == 'Approved') {
                  // We make sure that the user does not exceed a 20million limit
                  if (req.body.Amount < 20000001) {
                    // We check if the existing loan is repaid or not, if repaid then this else we accept the repay
                    if (loanData[0].repaid == 'True') {
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

                    if (loanData[0].balance == 0.00) {
                      model.pool.query(`UPDATE loan set repaid='True' where id=${loanData[0].id}`);
                    } else {
                      // Now loan is unrepaid and user exists we now accept and track the repayment
                      const today = new Date();
                      const currentDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
                      const makeRepaymentQueryValues = [loanData[0].id, currentDate, req.body.Amount, loanData[0].paymentinstallment];

                      model.pool.query(makeRepaymentQuery, makeRepaymentQueryValues)
                        .then((feedback) => {
                          // if Loan balance is less than zero we confirm that it is repaid
                          if (loanData[0].balance <= 0.00) {
                            model.pool.query(`UPDATE loan set repaid='True' where id=${loanData[0].id}`)
                              .then((result2) => {
                                res.status(200).json({
                                  Status: '200',
                                  Data: {
                                    Email: loanData[0].email,
                                    Firstname: loanData[0].firstname,
                                    Lastname: loanData[0].lastname,
                                    Paid: req.body.Amount,
                                    Balance: loanData[0].balance,
                                    Installment: loanData[0].paymentinstallment,
                                  },
                                  Repaid: 'True',
                                });
                              })
                              .catch((errror) => {
                                res.status(401).json({
                                  Status: 401,
                                  Error: errror.message,
                                });
                              });
                          } else {
                            // Now -> Loan balance is not zero we can calculate and send back the balance to be paid
                            const newBalance = loanData[0].balance - req.body.Amount;
                            model.pool.query(`Update loan set balance='${newBalance}' where id=${loanData[0].id}`)
                              .then((updated) => {
                                // This is sending back the correct Updated details back to user
                                model.pool.query(`SELECT * FROM loan WHERE id=${loanData[0].id}`)
                                  .then((currentData) => {
                                    if (currentData.rowCount > 0) {
                                      const updatedData = currentData.rows;

                                      if (updatedData[0].balance == 0.00) {
                                        res.status(201).json({
                                          Status: 201,
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
                                          Message: 'Successfully Placed Repayment',
                                        });
                                      } else {
                                        res.status(201).json({
                                          Status: 201,
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
                                          Message: 'Successfully Placed Repayment',
                                        });
                                      }
                                    }
                                  });
                              })
                              .catch((errr) => {
                                res.status(401).json({
                                  Status: '401',
                                  Message: errr.message,
                                });
                              });
                          }
                        })

                        .catch((error) => {
                          res.status(401).json({
                            Status: 401,
                            Message: error.message,
                          });
                        });
                    }
                  }
                } else {
                  res.status(400).json({
                    Status: 401,
                    Message: 'Loan has To be verified inorder to make repayment',
                  });
                }
              }
            })

            .catch((err) => {
              res.status(400).json({
                Status: 401,
                Message: err.message,
              });
            });
        } else {
          res.status(401).json({
            Status: 401,
            Message: 'Signup to access resource',
          });
        }
      })

      .catch((err) => {
        res.status(400).json({
          Status: 401,
          Message: 'Failed to process request, Try again later',
        });
      });
  } catch (error) {
    res.status(401).json({
      Message: 'Failed to decode token',
    });
  }
};
