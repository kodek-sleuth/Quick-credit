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
      res.status(400).json({
        Status: 400,
        Error: 'Email, Fullname and Password fields are required'
      });
    } 

    if (isNaN(req.body.Email) == false || isNaN(req.body.Fullname) == false)
    {
      res.status(400).json({
        Status: 400,
        Error: 'Email and Fullname cannot be Integer'
      });
    }

    else {
      admins.forEach((admin) => {
        if (admin.Email == req.body.Email || admin.Fullname == req.body.Fullname) {
          res.status(400).json({
            Status: 400,
            Error: 'Email or Name is already taken'
          });
        }
      });
        
      const newUser = {
        Email: req.body.Email,
        Fullname: req.body.Fullname,
        Password: req.body.Password,
        isAdmin: req.body.isAdmin
      };   

      admins.push(newUser); if (req.body.Email == null || req.body.Email == '' && req.body.Password == null || req.body.Password == '' && req.body.Fullname == null || req.body.Fullname == '') {
        res.status(400).json({
          Status: 400,
          Error: 'Email, Fullname and Password fields are required'
        });
      } 
  
      if (isNaN(req.body.Email) == false || isNaN(req.body.Fullname) == false)
      {
        res.status(400).json({
          Status: 400,
          Error: 'Email and Fullname cannot be Integer'
        });
      }
  
      else {
        admins.forEach((admin) => {
          if (admin.Email == req.body.Email || admin.Fullname == req.body.Fullname) {
            res.status(400).json({
              Status: 400,
              Error: 'Email or Name is already taken'
            });
          }
        });
          
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
    } 

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

  if (req.body.isAdmin == 'False')
  {
    if (req.body.Email == null || req.body.Email == '' && req.body.Password == null || req.body.Password == '' && req.body.Fullname == null || req.body.Fullname == '' && req.body.Address == '' || req.body.Address == null) {
      res.status(400).json({
        Status: 400,
        Error: 'Email, Fullname, Password and Address fields are required'
      });
    } 

    if (isNaN(req.body.Email) == false || isNaN(req.body.Fullname) == false)
    {
      res.status(400).json({
        Status: 400,
        Error: 'Email and Fullname cannot be Integer'
      });
    }

    else {
      users.forEach((admin) => {
        if (admin.Email == req.body.Email || admin.Fullname == req.body.Fullname) {
          res.status(400).json({
            Status: 400,
            Error: 'Email or Name is already taken'
          });
        }
      });
          
      const newUser2 = {
        Email: req.body.Email,
        Fullname: req.body.Fullname,
        Password: req.body.Password,
        isAdmin: req.body.isAdmin,
        Address: req.body.Address,
        Status: 'Pending'
      };   

      users.push(newUser2);

      res.status(201).json({
        Status: 201,
        Data: {
          Email: req.body.Email,
          Fullname: req.body.Fullname,
          Password: req.body.Password,
          isAdmin: req.body.isAdmin,
          Status: 'Pending',
          Address: req.body.Address
        },
        Users: users,
        Success: 'User successfully signed up' 
      });
    }

      if (req.body.isAdmin == '' || req.body.isAdmin == null)
      {
        res.status(400).json({
          Status: 400,
          Error: 'isAdmin is a required field'
        });
      }
  }
};
