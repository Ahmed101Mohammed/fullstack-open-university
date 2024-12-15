const config = require('./config')
const logger = require('./logger')
const jwt = require('jsonwebtoken')
const errorHandler = (error, request, response, next) =>
{
  const { name, message } = error
  logger.info(`-----${name} Error-----`)
  logger.error(message)
  logger.info('---------------')

  switch(name)
  {
  case 'ValidationError':
    return response.status(400).json({ name, message }).end()
  case 'JsonWebTokenError':
    return response.status(401).json({ name, message })
  default:
    response.status(500).json({ name, message }).end()
  }
}

const tokenExtractor = (request, response, next) =>
{
  const token = request.headers.authorization
  if(!token || !token.startsWith('Bearer '))
  {
    request.token = null
  }
  else
  {
    request.token = token.replace('Bearer ', '')
  }
  next()
}

const userExtractor = (request, response, next) =>
{
  const token = request.token
  if(!token) return response.status(401).json({ error: 'unauthorized token' })
  const decodedData = jwt.verify(token, config.JWT_KEY)
  request.user = decodedData
  next()
}

const middlewares = {
  errorHandler,
  tokenExtractor,
  userExtractor
}

module.exports = middlewares