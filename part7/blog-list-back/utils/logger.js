const config = require('../utils/config')

const info = (...params) =>
{
  if(config.NODE_ENV === 'test') return
  console.log(...params)
}

const error = (...params) =>
{
  if(config.NODE_ENV === 'test') return
  console.error(...params)
}

const logger = { info, error }
module.exports = logger