const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter
  .post('/', async(request, response) =>
  {
    const { name, username, password } = request.body

    const user = await User.findOne({ username })
    if(user) return response.status(409).json({ error: 'username is already used, choose a new one' }).end()

    if(!password) return response.status(400).json({ error: 'password is required' })
    if(password.length < 3) return response.status(400).json({ error: 'password length should be at least 3 charachters' })

    const passwordHashed = await bcrypt.hash(password, 10)
    const newUser = new User({
      username,
      name,
      password: passwordHashed
    })

    let savedUser = await newUser.save()

    response.status(201)
      .json(savedUser)
      .end()
  })
  .get('/', async(request, response) =>
  {
    const users = await User.find({}).populate('blogs')
    response.json(users)
  })

module.exports = userRouter