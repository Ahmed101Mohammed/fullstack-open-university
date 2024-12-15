require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.MONGODB_URI_TEST
  : process.env.MONGODB_URI

const config = {
  PORT: process.env.PORT,
  MONGODB_URI,
  NODE_ENV: process.env.NODE_ENV,
  JWT_KEY: process.env.JWT_KEY
}

module.exports = config