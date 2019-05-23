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
          // Since a repay will always be to that one unrepaid loan we may/many not user an id because a user will only have a loan after paying a new one
          model.pool.query(`select loan.status, loan.paymentinstallment, loan.balance, loan.id, users.firstname, users.email, users.lastname from loan join users on userid=${userId} where repaid='False'`)
            .then((result) => {
              if (result.rowCount > 0) {
                const [loanData] = result.rows;

                // We make sure that the loan to be repaid has to first be approved else error
                if (loanData.status == 'Approved') {
                  // We make sure that the user does not exceed a 20million limit
                  if (req.body.Amount < 20000001) {
                    // We check if the existing loan is repaid or not, if repaid then this else we accept the repay
                    if (loanData.repaid == 'True') {
                      res.status(200).json({
                        Status: '200',
                        Data: {
                          Email: loanData.email,
                          Firstname: loanData.firstname,
                          Lastname: loanData.lastname,
                          Paid: req.body.Amount,
                          Balance: loanData.balance,
                          Installment: loanData.paymentinstallment,
                        },
                        Repaid: 'True',
                      });
                    }

                    if (loanData.balance == 0.00) {
                      model.pool.query(`UPDATE loan set repaid='True' where id=${loanData.id}`);
                    } else {
                      // Now loan is unrepaid and user exists we now accept and track the repayment
                      const today = new Date();
                      const currentDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
                      const makeRepaymentQueryValues = [loanData.id, currentDate, req.body.Amount, loanData.paymentinstallment];

                      model.pool.query(makeRepaymentQuery, makeRepaymentQueryValues)
                        .then((feedback) => {
                          // if Loan balance is less than zero we confirm that it is repaid
                          if (loanData.balance <= 0.00) {
                            model.pool.query(`UPDATE loan set repaid='True' where id=${loanData.id}`)
                              .then((result2) => {
                                res.status(200).json({
                                  Status: '200',
                                  Data: {
                                    Email: loanData.email,
                                    Firstname: loanData.firstname,
                                    Lastname: loanData.lastname,
                                    Paid: req.body.Amount,
                                    Balance: loanData.balance,
                                    Installment: loanData.paymentinstallment,
                                  },
                                  Repaid: 'True',
                                });
                              })
                              .catch((errror) => {
                                res.status(400).json({
                                  Status: 400,
                                  Error: errror.message,
                                });
                              });
                          } else {
                            // Now -> Loan balance is not zero we can calculate and send back the balance to be paid
                            const newBalance = loanData.balance - req.body.Amount;
                            model.pool.query(`Update loan set balance='${newBalance}' where id=${loanData.id}`)
                              .then((updated) => {
                                // This is sending back the correct Updated details back to user
                                model.pool.query(`SELECT * FROM loan WHERE id=${loanData.id}`)
                                  .then((currentData) => {
                                    if (currentData.rowCount > 0) {
                                      const updatedData = currentData.rows;

                                      if (updatedData.balance == 0.00) {
                                        res.status(201).json({
                                          Status: 201,
                                          Data: {
                                            Email: updatedData.investee_email,
                                            Firstname: updatedData.investee_firstname,
                                            Lastname: updatedData.investee_lastname,
                                            Amount: updatedData.amount,
                                            Paid: req.body.Amount,
                                            Balance: updatedData.balance,
                                            Repaid: 'True',
                                            Installment: updatedData.paymentinstallment,
                                          },
                                          Message: 'Successfully Placed Repayment',
                                        });
                                      } else {
                                        res.status(201).json({
                                          Status: 201,
                                          Data: {
                                            Email: updatedData.email,
                                            Firstname: updatedData.firstname,
                                            Lastname: updatedData.lastname,
                                            Amount: updatedData.amount,
                                            Paid: req.body.Amount,
                                            Balance: updatedData.balance,
                                            Repaid: updatedData.repaid,
                                            Installment: updatedData.paymentinstallment,
                                          },
                                          Message: 'Successfully Placed Repayment',
                                        });
                                      }
                                    }
                                  });
                              })
                              .catch((errr) => {
                                res.status(401).json({
                                  Status: 401,
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
                  res.status(403).json({
                    Status: 403,
                    Message: 'Loan has To be verified inorder to make repayment',
                  });
                }
              }
            })

            .catch((err) => {
              res.status(400).json({
                Status: 400,
                Message: err.message,
              });
            });
        } else {
          res.status(403).json({
            Status: 403,
            Message: 'Signup to access resource',
          });
        }
      })

      .catch((err) => {
        res.status(403).json({
          Status: 403,
          Message: 'Failed to process request, Try again later',
        });
      });
  } catch (error) {
    res.status(401).json({
      Message: 'Failed to decode token',
    });
  }
};
