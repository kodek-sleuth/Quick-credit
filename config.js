import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  connectionString: 'postgresql://josekodek:sleuth@localhost:5432/quickcredit',
  jwt_key: 'I have a very big secret'
};
