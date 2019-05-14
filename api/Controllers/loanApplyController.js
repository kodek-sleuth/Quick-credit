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

    else
    {
        users.forEach(user => {
            
        })        
    }
};
