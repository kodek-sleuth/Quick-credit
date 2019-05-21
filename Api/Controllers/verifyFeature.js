/* eslint-disable no-lonely-if */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */

exports.verifyUser = (req, res, next) => {
  const Email = req.params.Email;

  const verifyUserQuery = `Update users SET status='Verified' where email='${Email}'`;

  pool.query(`Select * from users where email='${Email}'`)
    .then((result) => {
      if (result.rowCount > 0) {
        pool.query(verifyUserQuery)
          .then(() => {
            pool.query(`Select * from users where email='${Email}'`)
              .then((data) => {
                if (data.rowCount > 0) {
                  const dataFound = data.rows;
                  res.status(200).json({
                    Status: 200,
                    Data: {
                      Firstname: dataFound[0].firstname,
                      Lastname: dataFound[0].lastname,
                      Email: dataFound[0].email,
                      Status: dataFound[0].status,
                      Address: dataFound[0].address,
                    },
                    Success: 'Successfully Verified User',
                  });
                }
              });
          });
      } else {
        res.status(404).json({
          Status: '404',
          Error: 'User not found',
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        Status: '404',
        Error: 'User not found',
      });
    });
};
