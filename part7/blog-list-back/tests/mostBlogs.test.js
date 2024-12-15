const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('mostBlogs function', () =>
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

  test('Most author bloged for empty list is null', () =>
  {
    const blogs = []
    const mostAuthorBloged = listHelper.mostBlogs(blogs)

    assert.strictEqual(mostAuthorBloged, null)
  })

  test('Most author bloged list with one blog is the author of the blog', () =>
  {
    const blogs = [blogsDB[0]]
    const mostAuthorBloged = listHelper.mostBlogs(blogs)
    const expectedResault = {
      author: blogs[0].author,
      blogs: 1
    }
    assert.deepStrictEqual(mostAuthorBloged, expectedResault)
  })

  test('Most author bloged for list with multi blogs is calculated right', () =>
  {
    const blogs = blogsDB
    const mostAuthorBloged = listHelper.mostBlogs(blogs)
    const expectedResault = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    assert.deepStrictEqual(mostAuthorBloged, expectedResault)
  })
})