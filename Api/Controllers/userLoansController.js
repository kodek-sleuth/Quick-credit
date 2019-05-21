/* eslint-disable no-lonely-if */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */

import pg from 'pg';

const Pool = pg.Pool;

const connectionString = process.env.QUICK_CREDIT_DB;

const pool = new Pool({ connectionString: connectionString });

exports.getLoanRepayments = (req, res, next) => {
  const Email = req.params.Email;
  const loanId = req.params.loanId;

  pool.query(`Select * from repayments WHERE loanid=${loanId}`)
    .then((data) => {
      if (data.rowCount > 0) {
        const fetchedData3 = data.rows;
        res.status(200).json({
          Count: data.rowCount,
          Status: 200,
          Data: fetchedData3,
          Success: 'Successfully fetched Repayments',
        });
      } else {
        res.status(404).json({
          Status: '404',
          Error: 'No loan found with that id',
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
