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

exports.viewLoanHistory = (req, res, next) => {
    const userEmail = req.params.userEmail;
    models.repayments.forEach((loan) => {
        if (loan.Email == userEmail)
        {
            res.status(200).json({
                Status: 200,
                Data: loan,
                Success: 'Successfully returned loan History'
            });
        }
    });
};