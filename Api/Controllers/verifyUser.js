/* eslint-disable comma-dangle */
/* eslint-disable no-lonely-if */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */

import model from './databaseController';

exports.verifyUser = (req, res, next) => {
  const Email = req.params.Email;
  const verifyUserQuery = `Update users SET status='Verified' where email='${Email}'`;

  model.pool.query(`Select * from users where email='${Email}'`)
    .then((result) => {
      if (result.rowCount > 0) {
        model.pool.query(verifyUserQuery)
          .then(() => {
            model.pool.query(`Select * from users where email='${Email}'`)
              .then((data) => {
                if (data.rowCount > 0) {
                  const [dataFound] = data.rows;
                  res.status(200).json({
                    Status: 200,
                    Data: {
                      Firstname: dataFound.firstname,
                      Lastname: dataFound.lastname,
                      Email: dataFound.email,
                      Status: dataFound.status,
                      Address: dataFound.address,
                      isAdmin: dataFound.isAdmin
                    },
                    Message: 'Successfully Verified User',
                  });
                }
              });
          });
      } else {
        res.status(404).json({
          Status: 404,
          Message: 'User not found',
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        Status: 404,
        Message: 'User not found',
      });
    });
};
