const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('totalLikes function', () =>
{
  const blogsDB = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ]

  test('Total likes for empty list is 0', () =>
  {
    const blogs = []
    const totalLikes = listHelper.totalLikes(blogs)

    assert.strictEqual(totalLikes, 0)
  })

  test('Total likes for list with one blog is the blog likes number', () =>
  {
    const blogs = [blogsDB[0]]
    const totalLikes = listHelper.totalLikes(blogs)

    assert.strictEqual(totalLikes, blogs[0].likes)
  })

  test('Total likes for list with multi blogs is calculated right', () =>
  {
    const blogs = [blogsDB[0], blogsDB[1], blogsDB[2]]
    const totalLikes = listHelper.totalLikes(blogs)
    const expectedResault = blogs[0].likes + blogs[1].likes + blogs[2].likes
    assert.strictEqual(totalLikes, expectedResault)
  })
})