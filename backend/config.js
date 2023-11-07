"use strict";

// Config to share values through app
require('dotenv').config();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const SECRET_KEY = process.env.SECRET_KEY;

// Change bcrypt settings for testing
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === 'dev' ? 1 : 12;

module.exports = {
  PORT,
  NODE_ENV,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR
};