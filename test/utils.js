/* eslint-disable comma-dangle */

import random from 'random-email';

exports.userSignup = {
  Email: random({ domain: 'example.com' }),
  Firstname: 'Tally',
  Lastname: 'Jaya',
  isAdmin: false,
  Password: 'Stealth12',
  Address: 'Kampala'
};


exports.userSignupLoginUser = {
  Email: random({ domain: 'example.com' }),
  Firstname: 'Tally',
  Lastname: 'Jaya',
  isAdmin: false,
  Password: 'Stealth12',
  Address: 'Kampala'
};


exports.userSignupVerify = {
  Email: random({ domain: 'example.com' }),
  Firstname: 'Tally',
  Lastname: 'Jaya',
  isAdmin: true,
  Password: 'Stealth12',
  Address: 'Kampala'
};

exports.userSignupVerifyUser = {
  Email: random({ domain: 'example.com' }),
  Firstname: 'Tally',
  Lastname: 'Jaya',
  isAdmin: false,
  Password: 'Stealth12',
  Address: 'Kampala'
};


exports.userSignupLoginAdmin = {
  Email: random({ domain: 'example.com' }),
  Firstname: 'Tally',
  Lastname: 'Jaya',
  isAdmin: false,
  Password: 'Stealth12',
  Address: 'Kampala'
};

exports.userSignupLoanAdmin = {
  Email: random({ domain: 'example.com' }),
  Firstname: 'Tally',
  Lastname: 'Jaya',
  isAdmin: true,
  Password: 'Stealth12',
  Address: 'Kampala'
};

exports.userSignupLoanUser = {
  Email: random({ domain: 'example.com' }),
  Firstname: 'Tally',
  Lastname: 'Jaya',
  isAdmin: false,
  Password: 'Stealth12',
  Address: 'Kampala'
};

exports.adminCredLoan = {
  Email: random({ domain: 'example.com' }),
  Firstname: 'Tally',
  Lastname: 'Jaya',
  isAdmin: true,
  Password: 'Stealth12',
  Address: 'Kampala'
};

exports.userHistory = {
  Email: random({ domain: 'example.com' }),
  Firstname: 'Tally',
  Lastname: 'Jaya',
  isAdmin: false,
  Password: 'Stealth12',
  Address: 'Kampala'
};

exports.userSignupLoan = {
  Email: random({ domain: 'example.com' }),
  Firstname: 'Tally',
  Lastname: 'Jay',
  isAdmin: false,
  Password: 'Stealth12',
  Address: 'Kampala'
};

exports.userSignupName = {
  Email: random({ domain: 'example.com' }),
  Firstname: 'T',
  Lastname: 'Jay',
  isAdmin: 'False',
  Password: 'Stealth12',
  Address: 'Kampala'
};

exports.userSignupRepay = {
  Email: random({ domain: 'example.com' }),
  Firstname: 'Tally',
  Lastname: 'Jay',
  isAdmin: 'False',
  Password: 'Stealth12',
  Address: 'Kampala'
};


exports.userLogin = {
  Email: 'abel@gmail.com',
  Password: 'Stealth12'
};

exports.repay = {
  Amount: 21000
};

exports.userLoginUser = {
  Email: 'abel12@gmail.com',
  Password: 'Stealth12'
};

exports.userLoginAdmin = {
  Email: 'abel@gmail.com',
  Password: 'Stealth12'
};

exports.userLoginFake = {
  Email: 'nofjjjjjjj@la.com',
  Password: 'Stealth12'
};

exports.userLoginFakeEmail = {
  Email: 'nofjjjjjjjla.com',
  Password: 'Stealth12'
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
};

exports.userSignupExist = {
  Email: 'abel@gmail.com',
  Firstname: 'Tally',
  Lastname: 'Jay',
  isAdmin: false,
  Password: 'Stealth12',
  Address: 'Kampala'
};

exports.userSignupEmail = {
  Email: 'abelgmail.com',
  Firstname: 'Tally',
  Lastname: 'Jay',
  isAdmin: false,
  Password: 'Stealth12',
  Address: 'Kampala'
};

exports.userSignupNumbers = {
  Email: 'abel212222@gmail.com',
  Firstname: 'Tally21',
  Lastname: 'Jay',
  isAdmin: false,
  Password: 'Stealth12',
  Address: 'Kampala'
};

exports.userSignupFields = {
  Firstname: 'Tally21',
  Lastname: 'Jay',
  isAdmin: false,
  Password: 'Stealth12',
  Address: 'Kampala'
};

exports.adminToken = {
  Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiRW1haWwiOiJhYmVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOiJGYWxzZSIsImlhdCI6MTU1ODYwMDA2MSwiZXhwIjoxNTU4Njg2NDYxfQ.Hf1Ww2wjq32rcrQMfg6vUTkOOcV8z8yqs4LmkpMzwqA'
};

exports.userToken = {
  Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJFbWFpbCI6Im5vZkBsYS5ibmwiLCJpc0FkbWluIjoiRmFsc2UiLCJpYXQiOjE1NTg1MDcwOTgsImV4cCI6MTU1ODU5MzQ5OH0.gIoTfEpzhrEzJJXbGkBUl2S32h-vyV5trpMfti0TR3Q'
};

exports.userTokenUnverified = {
  Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTYsIkVtYWlsIjoidGFAdGlkaXouYXoiLCJpc0FkbWluIjoiRmFsc2UiLCJpYXQiOjE1NTg2MDA1OTMsImV4cCI6MTU1ODY4Njk5M30.CXs2oOlv1CljQTvRGY5UrxgrOEtGD7PGgfPST7tsS9k'
};

exports.TenorToken = {
  Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTcsIkVtYWlsIjoiZGV3bmVAZGlqbGlrLmluayIsImlzQWRtaW4iOiJGYWxzZSIsImlhdCI6MTU1ODYwMDc4NywiZXhwIjoxNTU4Njg3MTg3fQ.FF-eCfjLL9LGZwbPmXkTKt5YJjawvYOfSf0MUe1lvZU'
};

exports.userSignupNumbers = {
  Email: '333@gmail.com',
  Password: 'Stealth12'
};

exports.userSignupFields = {
  Email: 'melissa8822@gmail.com',
  Lastname: 'Jay',
  isAdmin: 'False',
  Password: 'Stealth12',
};
