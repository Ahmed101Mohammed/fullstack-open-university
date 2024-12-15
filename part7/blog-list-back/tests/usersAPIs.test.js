const { test, describe, beforeEach, after } = require('node:test')
const assert = require('assert')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./testsHelper')
const api = supertest(app)

beforeEach(async() =>
{
  await User.deleteMany({})
})

describe('POST: /api/users', () =>
{
  test('Creating new user with all valid user data. Is accepted with status 201, and respond saved user', async() =>
  {
    const allUsersAtStart = await helper.allUsersInDB()
    const user = {
      name: 'admin',
      password: 'admin',
      username: 'admin'
    }

    const response = await api.post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const body = response.body

    assert.strictEqual(body.username, user.username)

    const allUsersAtEnd = await helper.allUsersInDB()

    assert.strictEqual(allUsersAtEnd.length, allUsersAtStart.length + 1)
  })

  test('Creating new user failed if the username is dublicated, with status code 409', async() =>
  {
    const allUsersAtStart = await helper.allUsersInDB()
    const user = {
      name: 'admin',
      password: 'admin',
      username: 'admin'
    }

    await api.post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.post('/api/users')
      .send(user)
      .expect(409)
      .expect('Content-Type', /application\/json/)

    const errMessage = response.body
    const expectedErrorMessage = { error: 'username is already used, choose a new one' }
    assert.deepStrictEqual(errMessage, expectedErrorMessage)

    const allUsersAtEnd = await helper.allUsersInDB()
    assert.strictEqual(allUsersAtEnd.length, allUsersAtStart.length + 1)
  })

  test('Creating new user failed if there is no password', async() =>
  {
    const allUsersAtStart = await helper.allUsersInDB()
    const user = {
      name: 'admin',
      username: 'admin'
    }

    const response = await api.post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const errMessage = response.body
    const expectedErrorMessage = { error: 'password is required' }
    assert.deepStrictEqual(errMessage, expectedErrorMessage)

    const allUsersAtEnd = await helper.allUsersInDB()
    assert.strictEqual(allUsersAtEnd.length, allUsersAtStart.length)
  })

  test('Creating new user failed if the password length less than 3 charachters', async() =>
  {
    const allUsersAtStart = await helper.allUsersInDB()
    const user = {
      name: 'admin',
      password: 'ad',
      username: 'admin'
    }

    const response = await api.post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const errMessage = response.body
    const expectedErrorMessage = { error: 'password length should be at least 3 charachters' }
    assert.deepStrictEqual(errMessage, expectedErrorMessage)

    const allUsersAtEnd = await helper.allUsersInDB()
    assert.strictEqual(allUsersAtEnd.length, allUsersAtStart.length)
  })

  test('Creating new user failed if there no username', async() =>
  {
    const allUsersAtStart = await helper.allUsersInDB()
    const user = {
      name: 'admin',
      password: 'admin'
    }

    await api.post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const allUsersAtEnd = await helper.allUsersInDB()
    assert.strictEqual(allUsersAtEnd.length, allUsersAtStart.length)
  })

  test('Creating new user failed if the new username length less than 3 charachters', async() =>
  {
    const allUsersAtStart = await helper.allUsersInDB()
    const user = {
      name: 'admin',
      username: 'ad',
      password: 'admin'
    }

    await api.post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const allUsersAtEnd = await helper.allUsersInDB()
    assert.strictEqual(allUsersAtEnd.length, allUsersAtStart.length)
  })

})

after( async() =>
{
  await User.deleteMany({})
  mongoose.connection.close()
})