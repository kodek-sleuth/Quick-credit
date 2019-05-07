/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
// Library that enables us to make the JSON SPEC file
const swaggerDoc = require('swagger-jsdoc');

// Creating swag app from express
const express = require('express');

const swag = express.Router();

// Describing The Introductory Part of The API Documentation
const swaggerDefinition = {
    info: {
      title: 'Quick-Credit',
      version: '1.0.0',
      description: 'Quick Credit is an online lending platform that provides short term soft loans to individuals'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    basePath: '/',
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'authorization',
        scheme: 'bearer',
        in: 'header',
      },
    },
  };

// Options object is later sent to swagger server to generate UI/UX
const options = {
    swaggerDefinition,
    apis: ['./Api/Auth/*.js', './Api/Loans/*.js', './Api/Profiles/*.js', './Api/Verifications/*.js']
};

exports.swaggerSpec = swaggerDoc(options);
