/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */

import pg from 'pg';

const Pool = pg.Pool;

const connectionString = process.env.QUICK_CREDIT_DB;

const pool = new Pool({ connectionString: connectionString });


exports.getLoansApproved = (req, res, next) => {
  pool.query("Select * from loan WHERE status='Approved'")
    .then((data) => {
      if (data.rowCount > 0) {
        const fetchedData2 = data.rows;
        res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Data: fetchedData2,
          Success: 'Successfully Fetched Loans',
        });
      } else {
        res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Success: 'There are no approved loans',
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

exports.getLoansRejected = (req, res, next) => {
  pool.query("Select * from loan WHERE status='Rejected'")
    .then((data) => {
      if (data.rowCount > 0) {
        const fetchedData3 = data.rows;
        res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Data: fetchedData3,
          Success: 'Successfully Fetched Loans',
        });
      } else {
        res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Success: 'There are no rejected loans',
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

exports.getLoansRepaid = (req, res, next) => {
  pool.query("Select * from loan WHERE repaid='True'")
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
      res.status(500).json({
        Status: 500,
        Error: error.message,
      });
    });
};

exports.getLoansUnrepaid = (req, res, next) => {
  pool.query("Select * from loan WHERE repaid='False'")
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
      res.status(500).json({
        Status: 500,
        Error: error.message,
      });
    });
};

exports.getAllLoans = (req, res, next) => {
  pool.query('Select * from loan')
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
      res.status(500).json({
        Status: 500,
        Error: error.message,
      });
    });
};

exports.getSpecificLoan = (req, res, next) => {
  const loanId = req.params.loanId;
  pool.query(`Select * from loan WHERE id=${loanId}`)
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
        res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Success: 'Loan with that Id does not exist',
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
