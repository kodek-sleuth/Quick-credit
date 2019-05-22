/* eslint-disable no-lonely-if */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */

import model from './databaseController';

exports.approveLoan = (req, res, next) => {
  const loanId = req.params.loanId;

  const verifyLoanQuery = `Update loan SET status='Approved' where id='${loanId}'`;

  model.pool.query(`Select * from loan where id='${loanId}'`)
    .then((result) => {
      if (result.rowCount > 0) {
        model.pool.query(verifyLoanQuery)
          .then(() => {
            model.pool.query(`Select * from loan join users on userid=users.id where loan.id='${loanId}'`)
              .then((data) => {
                const dataFound = data.rows;
                res.status(200).json({
                  Status: 200,
                  Data: {
                    Firstname: dataFound[0].firstname,
                    Lastname: dataFound[0].lastname,
                    Email: dataFound[0].email,
                    Status: dataFound[0].status,
                    Amount: dataFound[0].amount,
                    Installment: dataFound[0].paymentinstallment,
                    Balance: dataFound[0].balance,
                    Repaid: dataFound[0].repaid,
                    Tenor: `${dataFound[0].tenor} months`,
                  },
                  Message: 'Successfully Approved Loan',
                });
              });
          })
          .catch((error) => {
            res.status(404).json({
              Status: 404,
              Message: error.message,
            });
          });
      } else {
        res.status(404).json({
          Status: 404,
          Message: 'No loan found with that id',
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        Status: 404,
        Message: err.message,
      });
    });
};
