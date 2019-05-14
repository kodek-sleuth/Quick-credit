/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable indent */
/* eslint-disable no-restricted-globals */
/* eslint-disable brace-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable no-empty */
/* eslint-disable comma-dangle */

const loans = [{
    Fullname: 'Charlie Wancellor',
    Email: 'charlie@gmail.com',
    Amount: 300000.0,
    Tenor: 5,
    Balance: 24030.0,
    Interest: 30000,
    Installment: 28999,
    Repaid: 'False',
    Status: 'Verified',
    CreatedOn: '21-05-2019'
}];

const users = [{
    Fullname: 'Kelvin Tinidyebwa',
    Email: 'kelvin@gmail.com',
    Password: 'stealth',
    Status: 'Verified',
    isAdmin: 'False',
    Address: 'Kitende, Entebbe'
  }];

exports.applyLoan = (req, res, next) => {
    if (req.body.Email == null || req.body.Fullname == null || req.body.Amount == null || req.body.Tenor == null)
    {
        res.status(400).json({
            Status: 400,
            Error: 'Email, Fullname, Amount and Tenor fields are required'
        });
    }

    if (isNaN(req.body.Email) == false || isNaN(req.body.Fullname) == false || isNaN(req.body.Amount) == true || isNaN(req.body.Tenor) == true)
    {
        res.status(400).json({
            Status: 400,
            Error: 'Email and Fullname should be String while Amount and Tenor Integers'
        });
    }

    else
    {
        users.forEach((user) => {
            if (user.Email == req.body.Email && user.Fullname == req.body.Fullname)
            {
                if (user.Status == 'Verified')
                {
                    loans.forEach((loan) => {
                        if (loan.Email == user.Email && loan.Fullname == user.Fullname)
                        {
                            if (loan.Repaid == 'False')
                            {
                                res.status(400).json({
                                    Status: 400,
                                    Error: 'User must pay old loan to apply for new loan'
                                });
                            }

                            else
                            {
                                const date = new
                            }
                        }
                    });
                    
                }

                else
                {
                    res.status(400).json({
                        Status: 400,
                        Error: 'User must be verified to use resource'
                    });
                }
            }

            else
            {
                res.status(400).json({
                    Status: 400,
                    Error: 'Please Signup to use resource'
                });
            }
        });     
    }
};
