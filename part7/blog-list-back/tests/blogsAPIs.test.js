const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const blogsAPIsTestsHelper = require('./testsHelper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async() =>
{
  await Blog.deleteMany({})
  await User.deleteMany({})
  const blogsObjects = blogsAPIsTestsHelper.initialBlogs.map((blog) => new Blog(blog))
  const asyncSaveFuncs = blogsObjects.map(blogObj => blogObj.save())

  await Promise.all(asyncSaveFuncs)
})

describe('GET: /api/blogs', () =>
{
  test('Get all blogs in json format with status 200 & the blogs received is the same number of initial blogs', async() =>
  {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, blogsAPIsTestsHelper.initialBlogs.length)
  })

  test('Get response in json format even there no blogs on DB with status code 200 & the number of blogs response is zero', async() =>
  {
    await Blog.deleteMany({})
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, 0)
  })

  test('Check that the response blogs, it`s blog structure contain id properity instead of _id', async() =>
  {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    assert(blog.id)
    assert(!blog._id)
  })

})

describe('POST: /api/blogs', () =>
{
  test('Saving a blog correctly to the DB, and the blogs number in DB, inceased by one after posting', async() =>
  {
    const user = {
      name: 'admin',
      password: 'admin',
      username: 'admin'
    }

    await api.post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response0 = await api.post('/api/login')
      .send(
        {
          username: 'admin',
          password: 'admin'
        }
      )
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = response0.body

    const blog = {
      title: 'Open-Source will make you richhhh!',
      author: 'Rohan Sharma',
      url: 'https://dev.to/rohan_sharma/open-source-will-make-you-richhhh-5gf8',
      likes: 119
    }

    const response = await api.post('/api/blogs')
      .send(blog)
      .set({ authorization: `Bearer ${token.token}` })
      .expect(201)

    const savedBlog = response.body
    const blogs = await blogsAPIsTestsHelper.allBlogsInDB()

    assert.strictEqual(blogs.length, blogsAPIsTestsHelper.initialBlogs.length+1)
    assert.strictEqual(savedBlog.title, blog.title)
  })

  test('Post blog to /api/blogs without `likes` properity, and it saved the blog correctly with zero likes', async() =>
  {
    const user = {
      name: 'admin',
      password: 'admin',
      username: 'admin'
    }

    await api.post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response0 = await api.post('/api/login')
      .send(
        {
          username: 'admin',
          password: 'admin'
        }
      )
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = response0.body

    const blog = {
      title: 'How to build a website using React and Rest APIs (React basics explained)',
      author: 'alexia cismaru',
      url: 'https://dev.to/alexia_cismaru_f49ed201c2/how-to-build-a-website-using-react-and-rest-apis-react-basics-explained-5bf9'
    }

    const response = await api.post('/api/blogs')
      .send(blog)
      .set({ authorization: `Bearer ${token.token}` })
      .expect(201)
    const savedBlog = response.body
    assert.strictEqual(savedBlog.likes, 0)
  })

  test('Post blog to /api/blogs without `title` properity is respond with 400 status code', async() =>
  {
    const user = {
      name: 'admin',
      password: 'admin',
      username: 'admin'
    }

    await api.post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response0 = await api.post('/api/login')
      .send(
        {
          username: 'admin',
          password: 'admin'
        }
      )
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = response0.body

    const blog = {
      author: 'alexia cismaru',
      url: 'https://dev.to/alexia_cismaru_f49ed201c2/how-to-build-a-website-using-react-and-rest-apis-react-basics-explained-5bf9',
      likes: 22
    }

    await api.post('/api/blogs')
      .send(blog)
      .set({ authorization: `Bearer ${token.token}` })
      .expect(400)
  })

  test('Post blog to /api/blogs without `url` properity is respond with 400 status code', async() =>
  {
    const user = {
      name: 'admin',
      password: 'admin',
      username: 'admin'
    }

    await api.post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response0 = await api.post('/api/login')
      .send(
        {
          username: 'admin',
          password: 'admin'
        }
      )
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = response0.body

    const blog = {
      title: 'How to build a website using React and Rest APIs (React basics explained)',
      author: 'alexia cismaru',
      likes: 22
    }

    await api.post('/api/blogs')
      .send(blog)
      .set({ authorization: `Bearer ${token.token}` })
      .expect(400)
  })
})

describe('DELETE: /api/blogs/:id', () =>
{
  test('Deleting the target existing blog correctly with status code 200, and the number of blogs in DB reduced by one', async() =>
  {
    const user = {
      name: 'admin',
      password: 'admin',
      username: 'admin'
    }

    await api.post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response0 = await api.post('/api/login')
      .send(
        {
          username: 'admin',
          password: 'admin'
        }
      )
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = response0.body

    const newBlog = {
      title: 'Open-Source will make you richhhh!',
      author: 'Rohan Sharma',
      url: 'https://dev.to/rohan_sharma/open-source-will-make-you-richhhh-5gf8',
      likes: 119
    }

    const responseOfNew = await api.post('/api/blogs')
      .send(newBlog)
      .set({ authorization: `Bearer ${token.token}` })
      .expect(201)

    const savedBlog = responseOfNew.body

    let blog = await Blog.findById(savedBlog.id)
    blog = blog.toJSON()
    const id = blog.id
    const response = await api.delete(`/api/blogs/${id}`)
      .set({ authorization: `Bearer ${token.token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const deletedBlog = response.body
    const blogsInDB = await blogsAPIsTestsHelper.allBlogsInDB()
    assert.strictEqual(deletedBlog.id, blog.id)
    assert.strictEqual(blogsInDB.length, blogsAPIsTestsHelper.initialBlogs.length)
  })

  test('Deleting the non-existing blog failed with status code 404, and the number of blogs in DB not reduced', async() =>
  {
    const user = {
      name: 'admin',
      password: 'admin',
      username: 'admin'
    }

    await api.post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response0 = await api.post('/api/login')
      .send(
        {
          username: 'admin',
          password: 'admin'
        }
      )
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = response0.body

    const id = await blogsAPIsTestsHelper.getNotExistingId()
    await api.delete(`/api/blogs/${id}`)
      .set({ authorization: `Bearer ${token.token}` })
      .expect(404)
      .expect('Content-Type', /application\/json/)

    const blogsInDB = await blogsAPIsTestsHelper.allBlogsInDB()
    assert.strictEqual(blogsInDB.length, blogsAPIsTestsHelper.initialBlogs.length)
  })

})

describe('PUT: /api/blogs/:id', () =>
{
  test('Update exist blog likes', async() =>
  {
    const user = {
      name: 'admin',
      password: 'admin',
      username: 'admin'
    }

    await api.post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response0 = await api.post('/api/login')
      .send(
        {
          username: 'admin',
          password: 'admin'
        }
      )
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = response0.body

    const newBlog = {
      title: 'Open-Source will make you richhhh!',
      author: 'Rohan Sharma',
      url: 'https://dev.to/rohan_sharma/open-source-will-make-you-richhhh-5gf8',
      likes: 119
    }

    const responseOfNew = await api.post('/api/blogs')
      .send(newBlog)
      .set({ authorization: `Bearer ${token.token}` })
      .expect(201)

    const savedBlogID = responseOfNew.body.id
    const response = await api.put(`/api/blogs/${savedBlogID}`)
      .send({ likes: 4 })
      .set({ authorization: `Bearer ${token.token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const updatedBlog = response.body
    assert.strictEqual(updatedBlog.likes, 4)
  })
})

after(async() =>
{
  await Blog.deleteMany({})
  await User.deleteMany({})
  mongoose.connection.close()
})