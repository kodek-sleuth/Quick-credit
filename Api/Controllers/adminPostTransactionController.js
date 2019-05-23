/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */

import model from './databaseController';

exports.postTransaction = (req, res, next) => {
  const loanId = req.params.loanId;

  const verifyLoanQuery = `Update loan SET repaid='True' where id='${loanId}'`;

  // We checkif the loan Exists
  model.pool.query(`Select * from loan where id='${loanId}'`)
    .then((data) => {
      if (data.rowCount > 0) {
        const dataFound = data.rows;

        // We make sure that Admin can only Post Transaction of un approved Loan
        if (dataFound.status == 'Approved') {
          // We then make the Update and then make another check to send back current data to the User
          model.pool.query(verifyLoanQuery)
            .then((feedback) => {
              model.pool.query(`SELECT * FROM loan join users on userid=users.id WHERE loan.id=${loanId}`)
                .then((newData) => {
                  const [fetchedData] = newData.rows;

                  res.status(200).json({
                    Status: 200,
                    Data: {
                      Firstname: fetchedData.firstname,
                      Lastname: fetchedData.lastname,
                      Email: fetchedData.email,
                      Status: fetchedData.status,
                      Amount: fetchedData.amount,
                      Installment: fetchedData.paymentinstallment,
                      Balance: fetchedData.balance,
                      Repaid: fetchedData.repaid,
                      Tenor: `${fetchedData.tenor} months`,
                    },
                    Message: 'Successfully Placed Transaction for User',
                  });
                });
            })
            .catch((error) => {
              res.status(400).json({
                Status: 400,
                Message: error.message,
              });
            });
        } else {
          res.status(403).json({
            Status: 403,
            Message: 'Loan has to be approved inorder to Post Transaction',
          });
        }
      } else {
        res.status(404).json({
          Status: 404,
          Message: 'No loan found with that id',
        });
      }
    })

    .catch((error) => {
      res.status(400).json({
        Status: 400,
        Message: error.message,
      });
    });
};
