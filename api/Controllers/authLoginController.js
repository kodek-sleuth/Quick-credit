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

exports.loginUser