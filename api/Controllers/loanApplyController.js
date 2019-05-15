/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable no-empty */
/* eslint-disable comma-dangle */

const models = require('../Models/models');

exports.applyLoan = (req, res, next) => {
  if (req.body.Email == null || req.body.Amount == null || req.body.Tenor == null) {
    res.status(400).json({
      Status: 400,
      Error: 'Email, Amount and Tenor fields are required'
    });
  }

  if (isNaN(req.body.Email) == false || isNaN(req.body.Amount) == true || isNaN(req.body.Tenor) == true) {
    res.status(400).json({
      Status: 400,
      Error: 'Email should be String while Amount and Tenor are Integers'
    });
  } else {
    models.users.forEach((user) => {
      if (user.Email == req.body.Email) {
        if (user.isAdmin == 'True') {
          res.status(400).json({
            Status: 400,
            Error: 'Admin cannot apply for loan'
          });
        }

        if (user.isAdmin == 'False') {
          if (user.Status == 'Verified') {
            models.loans.forEach((loan) => {
              if (loan.Email == user.Email && loan.Fullname == user.Fullname) {
                if (loan.Repaid == 'False') {
                  res.status(401).json({
                    Status: 401,
                    Error: 'User must repay old loan to apply for new loan'
                  });
                } else {
                  const today = new Date();

                  const currentDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

                  const interest = (5 * req.body.Amount) / 100;
                  const paymentInstallment = (req.body.Amount + interest) / req.body.Tenor;
                  const balance = req.body.Amount + interest;
                  const id = Math.floor((Math.random() * 10) + 1);
                  const newLoan = {
                    LoanId: id,
                    Email: req.body.Email,
                    Amount: req.body.Amount,
                    Tenor: req.body.Tenor,
                    Balance: balance,
                    Interest: interest,
                    MonthlyInstallment: paymentInstallment,
                    Repaid: 'False',
                    Status: 'Pending',
                    CreatedOn: currentDate
                  };

                  models.loans.push(newLoan);

                  res.status(201).json({
                    Status: '201',
                    loans: loan,
                    Data: {
                      LoanId: id,
                      Email: req.body.Email,
                      Amount: req.body.Amount,
                      Tenor: req.body.Tenor,
                      CreatedOn: currentDate,
                      Balance: balance,
                      Interest: interest,
                      MonthlyInstallment: paymentInstallment,
                      Repaid: 'False',
                      Status: 'Pending'
                    },
                    Success: 'Successfully Applied For Loan'
                  });
                }
              }
            });
          }
        } else {
          res.status(401).json({
            Status: 401,
            Error: 'User must be verified to use resource'
          });
        }
      } else {
        res.status(400).json({
          Status: 400,
          Error: 'Please Signup to use resource'
        });
      }
    });
  }
};
