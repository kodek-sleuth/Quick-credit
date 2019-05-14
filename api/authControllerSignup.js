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
  if (req.body.Email && req.body.Fullname && req.body.)  
};