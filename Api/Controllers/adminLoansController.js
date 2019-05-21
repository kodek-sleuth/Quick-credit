/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */

import pg from 'pg';

const Pool = pg.Pool;

const connectionString = process.env.QUICK_CREDIT_DB;

const pool = new Pool({ connectionString: connectionString });

exports.getLoansRepaid = (req, res, next) => {
  pool.query("Select * from loan join users on userid=users.id WHERE repaid='True' and status='Approved'")
    .then((data) => {
      if (data.rowCount > 0) {
        const fetchedData = data.rows;
        res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Data: fetchedData,
          Success: 'Successfully Fetched Loans',
        });
      } else {
        res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Error: 'There are no repaid loans',
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

exports.getLoansUnrepaid = (req, res, next) => {
  pool.query("Select * from loan join users on userid=users.id  WHERE repaid='False' and status='Approved'")
    .then((data) => {
      if (data.rowCount > 0) {
        const fetchedData = data.rows;
        res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Data: fetchedData,
          Success: 'Successfully Fetched Loans',
        });
      } else {
        res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Success: 'There are no unrepaid Loans',
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

exports.getAllLoans = (req, res, next) => {
  pool.query('Select * from loan join users on userid=users.id')
    .then((data) => {
      if (data.rowCount > 0) {
        const fetchedData = data.rows;
        res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Data: fetchedData,
          Success: 'Successfully Fetched Loans',
        });
      } else {
        res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Success: 'There are no Loans found',
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

exports.getSpecificLoan = (req, res, next) => {
  const loanId = req.params.loanId;
  pool.query(`Select * from loan join users on userid=users.id  WHERE loan.id=${loanId}`)
    .then((data) => {
      if (data.rowCount > 0) {
        const fetchedData = data.rows;
        res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Data: fetchedData,
          Success: 'Successfully Fetched Loan',
        });
      } else {
        res.status(404).json({
          Count: data.rowCount,
          Status: 404,
          Success: '  No loan found with that id',
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
