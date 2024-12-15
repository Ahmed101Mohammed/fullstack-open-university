const User = require('../models/user')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

loginRouter
  .post('/', async(request, response) =>
  {
    const { username, password } = request.body
    const user = await User.findOne({ username })
    if(!user) return response.status(404).json({ error: 'username not registered before' })

    const isCorrectPassword = await bcrypt.compare(password, user.password)

    if(!isCorrectPassword) return response.status(422).json({ error: 'Incorrect username or password' })

    const tokenCryptedData = {
      name: user.name,
      username: user.username
    }
    const sign = jwt.sign(tokenCryptedData, config.JWT_KEY, { expiresIn: 60*60 })

    return response.json({ token: sign, name: user.name, username: user.username }).end()
  })

module.exports = loginRouter