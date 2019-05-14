/* eslint-disable no-restricted-globals */
/* eslint-disable brace-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable no-empty */
/* eslint-disable comma-dangle */

exports.loginUser = (req, res, next) => {
  if (req.body.isAdmin == 'True') {
    if (req.body.Email == null || req.body.Email == '' && req.body.Password == null || req.body.Password == '') {
      res.status(400).json({
        Status: 400,
        Error: 'Email, Fullname and Password fields are required'
      });
    } 

    if (isNaN(req.body.Email) == false)
    {
      res.status(400).json({
        Status: 400,
        Error: 'Email cannot be Integer'
      });
    }

    else {
      admins.forEach((admin) => {
        if (admin.Email == req.body.Email && admin.Password == req.body.Password) {
          res.status(200).json({
            Status: 200,
            Data: {
              Email: admin.Email,
              Fullname: admin.Fullname,
              Password: admin.Password,
              isAdmin: admin.isAdmin
            },
            Success: 'Admin successfully logged up' 
          });
        }

        else
        {
          res.status(401).json({
            Status: 401,
            Error: 'Invalid Email or Password'
          });
        }
      });
    }
  }

  if (req.body.isAdmin == 'False')
  {
    if (req.body.Email == null || req.body.Email == '' && req.body.Password == null || req.body.Password == '' && req.body.Address == '' || req.body.Address == null) {
      res.status(400).json({
        Status: 400,
        Error: 'Email, Fullname, Password, Address fields are required'
      });
    } 

    if (isNaN(req.body.Email) == false)
    {
      res.status(400).json({
        Status: 400,
        Error: 'Email cannot be Integer'
      });
    }

    else {
      users.forEach((user) => {
        if (user.Email == req.body.Email && user.Password == req.body.Password) {
          res.status(200).json({
            Status: 200,
            Data: {
              Email: user.Email,
              Fullname: user.Fullname,
              Password: user.Password,
              isAdmin: user.isAdmin,
              Address: user.Address,
              Status: user.Status
            },
            Success: 'User successfully logged up' 
          });
        }

        else
        {
          res.status(401).json({
            Status: 401,
            Error: 'Invalid Email or Password'
          });
        }
      });
    }
  }

  if (req.body.isAdmin == null || req.body.isAdmin == null)
  {
    res.status(400).json({
      Status: 400,
      Error: 'isAdmin is a required field'
    });
  }
};
