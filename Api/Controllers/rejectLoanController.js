/* eslint-disable no-lonely-if */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */

import pg from 'pg';

const Pool = pg.Pool;

const connectionString = process.env.QUICK_CREDIT_DB;

const pool = new Pool({ connectionString: connectionString });

// An Approval is an update on the status
exports.rejectLoan = (req, res, next) => {
  const loanId = req.params.loanId;

  const verifyLoanQuery = `Update loan SET status='Rejected' where id='${loanId}'`;

  pool.query(`Select * from loan where id='${loanId}'`)
    .then((result) => {
      if (result.rowCount > 0) {
        pool.query(verifyLoanQuery)
          .then(() => {
            pool.query(`Select * from loan join users on userid=users.id where loan.id='${loanId}'`)
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
                  Success: 'Successfully Rejected Loan',
                });
              });
          })
          .catch((error) => {
            res.status(404).json({
              Status: '404',
              Error: error.message,
            });
          });
      } else {
        res.status(404).json({
          Status: '404',
          Error: 'No loan found with that id',
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        Status: '404',
        Error: err.message,
      });
    });
};
