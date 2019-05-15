/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable no-empty */
/* eslint-disable comma-dangle */

const models = require('../Models/models');

exports.verifyUser = (req, res, next) => {
  const userEmail = req.params.userEmail;

  if (userEmail) {
    models.users.forEach((user) => {
      if (user.Email == userEmail) {
        user.Status = 'Verified';

        res.status(200).json({
          Status: 200,
          Success: 'Successfully verified a user',
          Data: {
            Id: user.Id,
            Firstname: user.Firstname,
            Lastname: user.Lastname,
            Email: user.Email,
            Address: user.Address,
            Status: user.Status,
            isAdmin: user.isAdmin
          }
        });
      } else {
        res.status(400).json({
          Status: 400,
          Error: 'User with that id does not exist'
        });
      }
    });
  }
};
