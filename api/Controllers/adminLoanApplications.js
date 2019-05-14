/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
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

const models = require('../Models/models');

exports.repaidLoans = (req, res, next) => {
    models.loans.forEach((loan) => {
        if (loan.Repaid == 'True')
        {
            res.status(200).json({
                Status: 200,
                Success: 'Successfully returned all loan applications',
                Data: loan 
            });
        }
    });
};

exports.unrepaidLoans = (req, res, next) => {
    models.loans.forEach((loan) => {
        if (loan.Repaid == 'False')
        {
            res.status(200).json({
                Status: 200,
                Success: 'Successfully returned all loan applications',
                Data: loan 
            });
        }
    });
};

exports.allLoans = (req, res, next) => {
    models.loans.forEach((loan) => {
        res.status(200).json({
            Status: 200,
            Success: 'Successfully returned all loan applications',
            Data: loan 
        });
    });
};
