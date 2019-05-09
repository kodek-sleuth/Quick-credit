/* eslint-disable max-len */
/* eslint-disable eqeqeq */
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

// The main objective here is to create un update in repaid field of that loan 
exports.postTransaction = (req, res, next) => {
    const loanId = req.params.loanId;

    const verifyLoanQuery = `Update loan SET repaid='True' where id='${loanId}'`;

    // We checkif the loan Exists 
    pool.query(`Select * from loan where id='${loanId}'`)
        .then((data) => {
            if (data.rowCount > 0)
            {
                const dataFound = data.rows;
                
                // We make sure that Admin can only Post Transaction of un approved Loan
                if (dataFound[0].status == 'Approved')
                {
                    // We then make the Update and then make another check to send back current data to the User
                    pool.query(verifyLoanQuery)
                    .then((feedback) => {
                        pool.query(`SELECT * FROM loan WHERE id=${loanId}`)
                        .then((newData) => {
                            if (newData.rowCount > 0)
                            {
                                const fetchedData = newData.rows;

                                res.status(200).json({
                                    Status: 200,
                                    Data: {
                                        Fullname: fetchedData[0].investee_name,
                                        Email: fetchedData[0].investee_email,
                                        Status: fetchedData[0].status,
                                        Amount: fetchedData[0].amount,
                                        Installment: fetchedData[0].paymentinstallment,
                                        Balance: fetchedData[0].balance,
                                        Repaid: fetchedData[0].repaid,
                                        Tenor: `${fetchedData[0].tenor} months`
                                    },
                                    Success: 'Successfully Placed Transaction for User'
                                });
                            }

                            else
                            {
                                res.status(500).json({
                                    Status: '500',
                                    Error: 'No rows Found'
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
                }

                else
                {
                    res.status(500).json({
                        Status: '500',
                        Error: 'Loan has to be Approved inorder to Post Transaction'
                    });
                }   
            }
        })

    .catch((error) => {
        res.status(500).json({
            Status: '500',
            Error: error.message
        });
    });
};
