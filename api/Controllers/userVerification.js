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

exports.verifyUser = (req, res, next) => {
    const userId = req.params.userId;

    if (userId)
    {
        models.users.forEach((user) => {
            if (user.id == userId && user.isAdmin == 'False')
            {
                user.Status = 'Verified';

                res.status(200).json({
                    Status: 200,
                    Success: 'Successfully verified a user',
                    Data: {
                        Firstname: user.Email,
                        Lastname: user.Amount,
                        Email: user.Tenor,
                        Address: user.Balance,
                        Status: user.Interest,
                        isAdmin: user.Installment
                    }
                });
            }

            else
            {
                res.status(400).json({
                    Status: 400,
                    Error: 'User with that id does not exist'
                  });
            }
        });
    }
};
