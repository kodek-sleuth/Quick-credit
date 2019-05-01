/* eslint-disable brace-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */

const Pool = require('pg').Pool;

const connectionString = process.env.QUICK_CREDIT_DB;

const pool = new Pool({ connectionString: connectionString });

exports.approveLoan = (req, res, next) => {
    const loanId = req.params.loanId;

    const verifyLoanQuery = `Update loan SET status='Approved' where id='${loanId}'`;

    pool.query(verifyLoanQuery)
    .then((result) => {
        pool.query(`Select * from loan where id='${loanId}'`)
        .then((data) => {
            if (data.rowCount > 0)
            {
                const dataFound = data.rows;
                res.status(200).json({
                    Status: 200,
                    Data: {
                        Fullname: dataFound[0].investee_name,
                        Email: dataFound[0].investee_email,
                        Status: dataFound[0].status,
                        Address: dataFound[0].address
                    },
                    Success: 'Successfully Approved Loan'
                }); 
            }
        })
        .catch((error) => {
            res.status(500).json({
                Status: '500',
                Error: error.message
            });
        });
    })
    .catch((error) => {
        res.status(500).json({
            Status: '500',
            Error: error.message
        });
    });
};
