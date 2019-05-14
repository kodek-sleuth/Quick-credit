/* eslint-disable comma-dangle */
const express = require('express');

const admins = [{
  Fullname: 'Kelvin Tinidyebwa',
  Email: 'kelvin@gmail.com',
  Password: 'stealth',
  Status: 'Verified',
  isAdmin: 'False',
  Address: 'Kitende, Entebbe'
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
  if (req.body.isAdmin == 'True'){
     
  }

  if (req.body.isAdmin == 'False'){

  }

  else
  {
    res.status(409).json({
      Status: 409,
      Error: 'isAdmin field is required'
    });
  }
};
