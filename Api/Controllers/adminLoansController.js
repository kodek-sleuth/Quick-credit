/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */

import model from './databaseController';

exports.getLoansRepaid = (req, res, next) => {
  model.pool.query("Select * from loan join users on userid=users.id WHERE loan.repaid='True' and loan.status='Approved'")
    .then((data) => {
      const fetchedData = data.rows;
      if (data.rowCount) {
        res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Data: fetchedData,
          Message: 'Successfully Fetched Loans',
        });
      }

      return res.status(200).json({
        Count: data.rowCount,
        Status: 200,
        Message: 'There are no repaid loans',
      });
    })

    .catch((error) => {
      res.status(404).json({
        Status: 404,
        Error: error.message,
      });
    });
};

exports.getLoansUnrepaid = (req, res, next) => {
  model.pool.query("Select * from loan join users on userid=users.id  WHERE loan.repaid='False' and loan.status='Approved'")
    .then((data) => {
      if (data.rowCount) {
        const fetchedData = data.rows;
        return res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Data: fetchedData,
          Message: 'Successfully Fetched Loans'
        });
      }

      return res.status(200).json({
        Count: data.rowCount,
        Status: 200,
        Message: 'There are no unrepaid Loans'
      });
    })

    .catch((error) => {
      res.status(404).json({
        Status: 404,
        Error: error.message,
      });
    });
};

exports.getAllLoans = (req, res, next) => {
  model.pool.query('Select * from loan join users on userid=users.id')
    .then((data) => {
      if (data.rowCount) {
        const fetchedData = data.rows;
        return res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Data: fetchedData,
          Message: 'Successfully Fetched Loans'
        });
      }
      return res.status(200).json({
        Count: data.rowCount,
        Status: 200,
        Message: 'There are no Loans found'
      });
    })

    .catch((error) => {
      res.status(404).json({
        Status: 404,
        Error: error.message,
      });
    });
};

exports.getSpecificLoan = (req, res, next) => {
  const loanId = req.params.loanId;
  model.pool.query(`Select * from loan join users on userid=users.id  WHERE loan.id=${loanId}`)
    .then((data) => {
      if (data.rowCount > 0) {
        const fetchedData = data.rows;
        res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Data: fetchedData,
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
      res.status(404).json({
        Status: 404,
        Error: error.message,
      });
    });
};
