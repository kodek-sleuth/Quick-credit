/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */

import pg from 'pg';

const Pool = pg.Pool;

const connectionString = process.env.QUICK_CREDIT_DB;

const pool = new Pool({ connectionString: connectionString });

// The main objective here is to create un update in repaid field of that loan
exports.postTransaction = (req, res, next) => {
  const loanId = req.params.loanId;

  const verifyLoanQuery = `Update loan SET repaid='True' where id='${loanId}'`;

  // We checkif the loan Exists
  pool.query(`Select * from loan where id='${loanId}'`)
    .then((data) => {
      if (data.rowCount > 0) {
        const dataFound = data.rows;

        // We make sure that Admin can only Post Transaction of un approved Loan
        if (dataFound[0].status == 'Approved') {
          // We then make the Update and then make another check to send back current data to the User
          pool.query(verifyLoanQuery)
            .then((feedback) => {
              pool.query(`SELECT * FROM loan join users on loanid=users.id WHERE loan.id=${loanId} `)
                .then((newData) => {
                  const fetchedData = newData.rows;

                  res.status(200).json({
                    Status: 200,
                    Data: {
                      Firstname: fetchedData[0].firstname,
                      Lastname: fetchedData[0].lastname,
                      Email: fetchedData[0].email,
                      Status: fetchedData[0].status,
                      Amount: fetchedData[0].amount,
                      Installment: fetchedData[0].paymentinstallment,
                      Balance: fetchedData[0].balance,
                      Repaid: fetchedData[0].repaid,
                      Tenor: `${fetchedData[0].tenor} months`,
                    },
                    Success: 'Successfully Placed Transaction for User',
                  });
                });
            });
        } else {
          res.status(401).json({
            Status: '401',
            Error: 'Loan has to be Approved inorder to Post Transaction',
          });
        }
      } else {
        res.status(404).json({
          Status: '404',
          Error: 'No loan found with that id',
        });
      }
    })

    .catch((error) => {
      res.status(400).json({
        Status: '400',
        Error: error.message,
      });
    });
};
