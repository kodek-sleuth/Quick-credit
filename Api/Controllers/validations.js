/* eslint-disable comma-dangle */
/* eslint-disable newline-per-chained-call */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-useless-escape */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */

import joi from 'joi';

exports.validateSignup = (object) => {
  const schema = joi.object().keys({
    Email: joi.string().email().required().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).label('Please enter a valid email address'),
    Firstname: joi.string().min(3).max(20).trim().required().regex(/^[A-Za-z]+$/).label('Please enter a valid firstname of not more than 20 characters e.g Mugerwa'),
    Lastname: joi.string().min(3).max(20).trim().required().regex(/^[A-Za-z]+$/).label('Please enter a valid secondname of not more than 20 characters e.g Joseph'),
    Password: joi.string().required().min(3).max(20).regex(/^[a-zA-Z0-9]{8,15}$/).label('Password should be between 3 and 20'),
    Address: joi.string().min(3).required(),
    isAdmin: joi.boolean().required()
  });

  return joi.validate(object, schema);
};

exports.validateLogin = (object) => {
  const schema = joi.object().keys({
    Email: joi.string().email().required().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).label('Please enter a valid email address'),
    Password: joi.string().required().min(3).max(20).label('Invalid Email or Password')
  });

  return joi.validate(object, schema);
};

exports.loanPayment = (object) => {
  const schema = joi.object().keys({
    Amount: joi.number().label('Please enter amount in numbers')
  });

  return joi.validate(object, schema);
};
