/* eslint-disable no-undef */
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

exports.getAllUsers = (req, res, next) => {
    pool.query('Select * from users')
    .then((data) => {
        if (data.rowCount > 0)
        {
            const fetchedData1 = data.rows;
            res.status(200).json({
                Status: 200,
                Data: fetchedData1,
                Success: 'Successfully Fetched Users'
            });
        }

        else
        {
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Success: 'There are No Users in database'
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

exports.getUsersVerified = (req, res, next) => {
    pool.query("Select * from users WHERE status='Verified'")
    .then((data) => {
        if (data.rowCount > 0)
        {
            const fetchedData2 = data.rows;
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Data: fetchedData2,
                Success: 'Successfully Fetched Users'
            });
        }

        else
        {
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Success: 'There are no verified users'
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

exports.getUsersPending = (req, res, next) => {
    pool.query("Select * from users WHERE status='Pending'")
    .then((data) => {
        if (data.rowCount > 0)
        {
            const fetchedData2 = data.rows;
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Data: fetchedData2,
                Success: 'Successfully Fetched Users'
            });
        }

        else
        {
            res.status(200).json({
                Status: 200,
                Success: 'There are no pending users'
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
    pool.query("Select * from loan WHERE status='Approved'")
    .then((data) => {
        if (data.rowCount > 0)
        {
            const fetchedData2 = data.rows;
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Data: fetchedData2,
                Success: 'Successfully Fetched Loans'
            });
        }

        else
        {
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Success: 'There are no approved loans'
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
    pool.query("Select * from loan WHERE status='Rejected'")
    .then((data) => {
        if (data.rowCount > 0)
        {
            const fetchedData3 = data.rows;
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Data: fetchedData3,
                Success: 'Successfully Fetched Loans'
            });
        }

        else
        {
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Success: 'There are no rejected loans'
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
    pool.query("Select * from loan WHERE repaid='True'")
    .then((data) => {
        if (data.rowCount > 0)
        {
            const fetchedData = data.rows;
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Data: fetchedData,
                Success: 'Successfully Fetched Loans'
            });
        }

        else
        {
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Error: 'There are no repaid loans'
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
    pool.query("Select * from loan WHERE repaid='False'")
    .then((data) => {
        if (data.rowCount > 0)
        {
            const fetchedData = data.rows;
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Data: fetchedData,
                Success: 'Successfully Fetched Loans'
            });
        }

        else
        {
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Success: 'There are no unrepaid Loans'
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


exports.getAllLoansPending = (req, res, next) => {
    pool.query("Select * from loan WHERE status='Pending'")
    .then((data) => {
        if (data.rowCount > 0)
        {
            const fetchedData = data.rows;
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Data: fetchedData,
                Success: 'Successfully Fetched Loans'
            });
        }

        else
        {
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Success: 'There are no pending loans'
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

exports.getAllLoans = (req, res, next) => {
    pool.query('Select * from loan')
    .then((data) => {
        if (data.rowCount > 0)
        {
            const fetchedData = data.rows;
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Data: fetchedData,
                Success: 'Successfully Fetched Loans'
            });
        }

        else
        {
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Success: 'There are no Loans found'
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

exports.getSpecificLoan = (req, res, next) => {
    const loanId = req.params.loanId;
    pool.query(`Select * from loan WHERE id=${loanId}`)
    .then((data) => {
        if (data.rowCount > 0)
        {
            const fetchedData = data.rows;
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Data: fetchedData,
                Success: 'Successfully Fetched Loan'
            });
        }

        else
        {
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Success: 'Loan with that Id does not exist'
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
