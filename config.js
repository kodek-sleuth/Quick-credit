/* eslint-disable comma-dangle */
import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  connectionString: process.env.QUICK_CREDIT_DB_V1,
  secret: process.env.SECRET_KEY
};
