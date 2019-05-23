/* eslint-disable eqeqeq */
/* eslint-disable no-lonely-if */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */

import jwt from 'jsonwebtoken';

import model from './databaseController';

import config from '../../config';

exports.applyLoan = (req, res, next) => {
  const queryReqLoan = 'INSERT INTO loan(userid, createdOn, tenor, amount, paymentInstallment, balance, interest) VALUES($1, $2, $3, $4, $5, $6, $7)';

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, config.secret);
    const userId = decode.id;
    const emailId = decode.Email;

    model.pool.query(`Select * from users WHERE email='${emailId}'`)
      .then((data) => {
        if (data.rowCount > 0) {
          const [dataFetched] = data.rows;
          if (dataFetched.status == 'Verified') {
            model.pool.query(`select * from loan join users on userid=${userId} where repaid='False'`)
              .then((loanData) => {
                if (loanData.rowCount > 0) {
                  res.status(403).json({
                    Status: 403,
                    Message: 'You cannot apply for two loans at once',
                  });
                } else {
                  if (req.body.Tenor > 12) {
                    res.status(403).json({
                      Status: 403,
                      Message: 'Tenor must be 12 or less',
                    });
                  } else {
                  // Making sure that user does not apply for loan exceeding 20000000
                    if (req.body.Amount > 20000000) {
                      res.status(403).json({
                        Status: 403,
                        Message: 'User can only request for a loan less than 20,000,001',
                      });
                    } else {
                    // Creating current date
                      const today = new Date();
                      const currentDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

                      const interest = (5 * req.body.Amount) / 100;
                      const paymentInstallment = (req.body.Amount + interest) / req.body.Tenor;
                      const balance = req.body.Amount + interest;
                      const queryReqValues = [dataFetched.id, currentDate, req.body.Tenor, req.body.Amount, paymentInstallment, balance, interest];

                      // Posting the Loan to Database
                      model.pool.query(queryReqLoan, queryReqValues)
                        .then((result) => {
                          res.status(201).json({
                            Status: 201,
                            Data: {
                              Email: dataFetched.email,
                              Firstname: dataFetched.firstname,
                              Lastname: dataFetched.lastname,
                              Amount: req.body.Amount,
                              Tenor: req.body.Tenor,
                              CreatedOn: currentDate,
                              Balance: balance,
                              Interest: interest,
                              PaymentInstallment: paymentInstallment,
                            },
                            Message: 'Successfully applied For loan',
                          });
                        })

                        .catch((error) => {
                          res.status(400).json({
                            Status: 400,
                            Message: error.message,
                          });
                        });
                    }
                  }
                }
              })
              .catch((err) => {
                res.status(400).json({
                  Status: 400,
                  Message: err,
                });
              });
          } else {
            res.status(403).json({
              Status: 403,
              Message: 'User must be verified To make this request',
            });
          }
        } else {
          res.status(403).json({
            Status: 403,
            Message: 'Please Signup to use resource',
          });
        }
      })

      .catch((error) => {
        res.status(500).json({
          Status: 500,
          Message: 'Failed to process request, Try again later',
        });
      });
  } catch (error) {
    res.status(401).json({
      Message: 'Failed to decode token',
    });
  }
};
