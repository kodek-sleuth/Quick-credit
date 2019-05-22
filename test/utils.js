/* eslint-disable comma-dangle */

import random from 'random-email';

exports.userSignup = {
  Email: random(),
  Firstname: 'Tally',
  Lastname: 'Jay',
  isAdmin: 'True',
  Password: 'stealth',
  Address: 'Kampala'
};

exports.userSignupLoan = {
  Email: random(),
  Firstname: 'Tally',
  Lastname: 'Jay',
  isAdmin: 'False',
  Password: 'stealth',
  Address: 'Kampala'
};

exports.userSignupRepay = {
  Email: random(),
  Firstname: 'Tally',
  Lastname: 'Jay',
  isAdmin: 'False',
  Password: 'stealth',
  Address: 'Kampala'
};


exports.userLogin = {
  Email: 'nof@la.com',
  Password: 'stealth'
};

exports.repay = {
  Amount: 21000
};

exports.userLoginUser = {
  Email: 'nof@la.com',
  Password: 'stealth'
};

exports.userLoginAdmin = {
  Email: 'melissa289@gmail.com',
  Password: 'stealth'
};

exports.userLoginFake = {
  Email: 'nofjjjjjjj@la.com',
  Password: 'stealth'
};

exports.userLoanApply = {
  Amount: 290111,
  Tenor: 12
};

exports.userLoanApplyTenor = {
  Amount: 290111,
  Tenor: 25
};

exports.userLoanApplyMissing = {
  Amount: 19999
}

exports.userSignupExist = {
  Email: 'nof@la.com',
  Firstname: 'Tally',
  Lastname: 'Jay',
  isAdmin: 'False',
  Password: 'stealth',
  Address: 'Kampala'
};

exports.adminToken = {
  Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUxLCJFbWFpbCI6Im1lbGlzc2EyODlAZ21haWwuY29tIiwiaXNBZG1pbiI6IkZhbHNlIiwiaWF0IjoxNTU4NDk0NTYxLCJleHAiOjE1NTg1ODA5NjF9.Zhwi1-hzHkkRwOTAEDb5oYBnY_qc_XdLSLIOw1Gce18'
};

exports.userToken = {
  Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJFbWFpbCI6Im5vZkBsYS5ibmwiLCJpc0FkbWluIjoiRmFsc2UiLCJpYXQiOjE1NTg1MDcwOTgsImV4cCI6MTU1ODU5MzQ5OH0.gIoTfEpzhrEzJJXbGkBUl2S32h-vyV5trpMfti0TR3Q'
};

exports.userTokenUnverified = {
  Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM5LCJFbWFpbCI6Imx1dkBwYWxmby5leHBlcnQiLCJpc0FkbWluIjoiRmFsc2UiLCJpYXQiOjE1NTg1MTAzMDgsImV4cCI6MTU1ODU5NjcwOH0.q7OccWbsTd_CAVSRNoz1PSQqXDnqWg87sHvsKgyT1LI'
};

exports.userSignupNumbers = {
  Email: '333@gmail.com',
  Password: 'stealth'
};

exports.userSignupFields = {
  Email: 'melissa8822@gmail.com',
  Lastname: 'Jay',
  isAdmin: 'False',
  Password: 'stealth',
};
