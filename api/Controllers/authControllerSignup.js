/* eslint-disable no-restricted-globals */
/* eslint-disable brace-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable no-empty */
/* eslint-disable comma-dangle */
const express = require('express');

const admins = [{
  Fullname: 'Kelvin Tinidyebwa',
  Email: 'kelvin@gmail.com',
  Password: 'stealth',
  isAdmin: 'False'
}];

const users = [{
  Fullname: 'Kelvin Tinidyebwa',
  Email: 'kelvin@gmail.com',
  Password: 'stealth',
  Status: 'Verified',
  isAdmin: 'False',
  Address: 'Kitende, Entebbe'
}];

exports.signUpUser = (req, res, next) => {
  if (req.body.isAdmin == 'True') {
    if (req.body.Email == null || req.body.Email == '' && req.body.Password == null || req.body.Password == '' && req.body.Fullname == null || req.body.Fullname == '') {
      res.status(409).json({
        Status: 409,
        Error: 'Email, Fullname and Password fields are required'
      });
    } 

    if (isNaN(req.body.Email) == false && isNaN(req.body.Fullname) == false) {
      res.status(401).json({
        Status: 401,
        Error: 'Email and Fullname cannot be Integer'
      });
    } 
    
    else {
      
      admins.forEach((admin) => {
        if (admin.Email == req.body.Email) {
          res.status(401).json({
            Status: 401,
            Error: 'Email is already taken'
          });
        }
        
        else
        {
          const newUser = {
            Email: req.body.Email,
            Fullname: req.body.Fullname,
            Password: req.body.Password,
            isAdmin: req.body.isAdmin
          };   

          admins.push(newUser);

          res.status(201).json({
            Status: 201,
            Data: {
              Email: req.body.Email,
              Fullname: req.body.Fullname,
              Password: req.body.Password,
              isAdmin: req.body.isAdmin
            },
            Admins: admins,
            Success: 'Admin successfully signed up' 
          });
        }
        
      });
    }
  }
};
