/* eslint-disable no-lonely-if */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable brace-style */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable indent */

const Pool = require('pg').Pool;

const connectionString = process.env.QUICK_CREDIT_DB;

const pool = new Pool({ connectionString: connectionString });

// Function to Update Loans
const updateLoan = () => {
    pool.query("UPDATE loan set repaid='True' WHERE status='Verified' and balance<=0.00")
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
};

updateLoan();

exports.getLoansApplied = (req, res, next) => {
    const Email = req.params.Email;

    pool.query(`Select * from loan WHERE investee_email='${Email}'`)
    .then((data) => {
        if (data.rowCount > 0)
        {
            const fetchedData1 = data.rows;
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Data: fetchedData1,
                Success: 'Successfully fetched Loans'
            });
        }

        else
        {
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Message: 'User has not applied for any loans'
            });
        }
    })

    .catch((error) => {
        res.status(500).json({
            Status: 500,
            Error: error.message 
        });
    });
};

exports.getLoansApproved = (req, res, next) => {
    const Email = req.params.Email;

    pool.query(`Select * from loan WHERE investee_email='${Email}' and status='Approved'`)
    .then((data) => {
        if (data.rowCount > 0)
        {
            const fetchedData2 = data.rows;
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Data: fetchedData2,
                Success: 'Successfully fetched Loans'
            });
        }

        else
        {
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Message: 'User has no approved loans'
            });
        }
    })

    .catch((error) => {
        res.status(500).json({
            Status: 500,
            Error: error.message 
        });
    });
};

exports.getLoansRejected = (req, res, next) => {
    const Email = req.params.Email;

    pool.query(`Select * from loan WHERE investee_email='${Email}' and status='Rejected'`)
    .then((data) => {
        if (data.rowCount > 0)
        {
            const fetchedData3 = data.rows;
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Data: fetchedData3,
                Success: 'Successfully fetched Loans'
            });
        }

        else
        {
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Message: 'User has no rejected loans'
            });
        }
    })

    .catch((error) => {
        res.status(500).json({
            Status: 500,
            Error: error.message 
        });
    });
};

exports.getLoansRepaid = (req, res, next) => {
    const Email = req.params.Email;

    pool.query(`Select * from loan WHERE investee_email='${Email}' and repaid='True'`)
    .then((data) => {
        if (data.rowCount > 0)
        {
            const fetchedData = data.rows;
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Data: fetchedData,
                Success: 'Successfully fetched Loans'
            });
        }

        else
        {
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Message: 'User has no repaid loans'
            });
        }
    })

    .catch((error) => {
        res.status(500).json({
            Status: 500,
            Error: error.message 
        });
    });
};

exports.getLoansUnrepaid = (req, res, next) => {
    const Email = req.params.Email;

    pool.query(`Select * from loan WHERE investee_email='${Email}' and repaid='False'`)
    .then((data) => {
        if (data.rowCount > 0)
        {
            const fetchedData = data.rows;
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Data: fetchedData,
                Success: 'Successfully fetched Loans'
            });
        }

        else
        {
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Message: 'User has no unrepaid loans'
            });
        }
    })

    .catch((error) => {
        res.status(500).json({
            Status: 500,
            Error: error.message 
        });
    });
};
