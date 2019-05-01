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

exports.postTransaction = (req, res, next) => {
    const loanId = req.params.loanId;

    const verifyLoanQuery = `Update loan SET repaid='True' and balance=0.00 where id='${loanId}'`;

    pool.query(`Select * from loan where id='${loanId}'`)
        .then((data) => {
            if (data.rowCount > 0)
            {
                const dataFound = data.rows;

                if (dataFound[0].status == 'Approved')
                {
                    pool.query(verifyLoanQuery)
                    .then((feedback) => {
                        res.status(200).json({
                            Status: 200,
                            Data: {
                                Fullname: dataFound[0].investee_name,
                                Email: dataFound[0].investee_email,
                                Status: dataFound[0].status,
                                Amount: dataFound[0].amount,
                                Installment: dataFound[0].paymentinstallment,
                                Balance: dataFound[0].balance,
                                Repaid: dataFound[0].repaid,
                                Tenor: `${dataFound[0].tenor} months`
                            },
                            Success: 'Successfully Placed Transaction for User'
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
