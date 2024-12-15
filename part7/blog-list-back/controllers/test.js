const Blog = require('../models/blog')
const User = require('../models/user')

const testRouter = require('express').Router()

testRouter.post('/reset', async(request, response) =>
{
  await User.deleteMany({})
  await Blog.deleteMany({})
  const users = await User.find({})
  const blogs = await Blog.find({})
  response.json({ users, blogs })
})

module.exports = testRouter