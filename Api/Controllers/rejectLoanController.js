/* eslint-disable no-lonely-if */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */

import pg from 'pg';

const Pool = pg.Pool;

const connectionString = process.env.QUICK_CREDIT_DB;

const pool = new Pool({ connectionString: connectionString });

// This func creates un update in the status field and denies User Loan
exports.rejectLoan = (req, res, next) => {
  const loanId = req.params.loanId;

  const verifyLoanQuery = `Update loan SET status='Rejected' where id='${loanId}'`;

  pool.query(verifyLoanQuery)
    .then((result) => {
      pool.query(`Select * from loan where id='${loanId}'`)
        .then((data) => {
          if (data.rowCount > 0) {
            const dataFound = data.rows;
            res.status(200).json({
              Status: 200,
              Data: {
                Firstname: dataFound[0].investee_firstname,
                Lastname: dataFound[0].investee_lastname,
                Email: dataFound[0].investee_email,
                Status: dataFound[0].status,
                Amount: dataFound[0].amount,
                Installment: dataFound[0].paymentinstallment,
                Balance: dataFound[0].balance,
                Repaid: dataFound[0].repaid,
                Tenor: `${dataFound[0].tenor} months`,
              },
              Success: 'Successfully Rejected Loan',
            });
          } else {
            res.status(404).json({
              Status: '404',
              Error: 'Invalid Id',
            });
          }
        })
        .catch((error) => {
          res.status(500).json({
            Status: '500',
            Error: error.message,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        Status: '500',
        Error: error.message,
      });
    });
};
