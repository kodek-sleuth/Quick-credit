/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */

import model from './databaseController';

exports.getLoansRepaid = (req, res, next) => {
  const sqlQuery = 'Select loan.id, users.id, users.email, users.firstname, users.lastname, users.address, loan.amount, loan.balance, loan.interest, loan.paymentinstallment, loan.tenor, loan.repaid, loan.status from loan join users on userid=users.id';
  model.pool.query(sqlQuery)
    .then((data) => {
      const fetchedData = data.rows;
      if (data.rowCount) {
        res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Data: fetchedData,
          Message: 'Successfully Fetched Loans',
        });
      } else {
        return res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Message: 'There are no repaid loans',
        });
      }
    });
};

exports.getLoansUnrepaid = (req, res, next) => {
  const sqlQuery = 'Select loan.id, users.id, users.email, users.firstname, users.lastname, users.address, loan.amount, loan.balance, loan.interest, loan.paymentinstallment, loan.tenor, loan.repaid, loan.status from loan join users on userid=users.id';
  model.pool.query(sqlQuery)
    .then((data) => {
      if (data.rowCount) {
        const fetchedData = data.rows;
        return res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Data: fetchedData,
          Message: 'Successfully Fetched Loans'
        });
      } else {
        return res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Message: 'There are no unrepaid Loans'
        });
      }
    })

    .catch((error) => {
      res.status(500).json({
        Status: 500,
        Message: error.message,
      });
    });
};

exports.getAllLoans = (req, res, next) => {
  const sqlQuery = 'Select loan.id, users.id, users.email, users.firstname, users.lastname, users.address, loan.amount, loan.balance, loan.interest, loan.paymentinstallment, loan.tenor, loan.repaid, loan.status from loan join users on userid=users.id';
  model.pool.query(sqlQuery)
    .then((data) => {
      if (data.rowCount) {
        const fetchedData = data.rows;
        return res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Data: fetchedData,
          Message: 'Successfully Fetched Loans'
        });
      } else {
        return res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Message: 'There are no Loans found'
        });
      }
    })

    .catch((error) => {
      res.status(500).json({
        Status: 500,
        Message: error.message,
      });
    });
};

exports.getSpecificLoan = (req, res, next) => {
  const loanId = req.params.loanId;
  model.pool.query(`Select * from loan join users on userid=users.id  WHERE loan.id=${loanId}`)
    .then((data) => {
      if (data.rowCount > 0) {
        const [fetchedData] = data.rows;
        res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Data: {
            Firstname: fetchedData.firstname,
            Lastname: fetchedData.lastname,
            Email: fetchedData.email,
            Status: fetchedData.status,
            Amount: fetchedData.amount,
            Balance: fetchedData.balance,
            Repaid: fetchedData.repaid,
            Tenor: fetchedData.tenor,
            Interest: fetchedData.interest,
            Installment: fetchedData.paymentinstallment,
            CreatedOn: fetchedData.createdon
          },
          Message: 'Successfully Fetched Loan'
        });
      } else {
        res.status(404).json({
          Count: data.rowCount,
          Status: 404,
          Message: 'No loan found with that id'
        });
      }
    })

    .catch((error) => {
      res.status(500).json({
        Status: 500,
        Error: error.message,
      });
    });
};
