const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('dummy function', () =>
{
  test('dummy returns one for empty blogs', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })

  test('dummy returns one for non-empty blogs', () => {
    const blogs = [
      {
        title: 'Server-Side Rendering (SSR): Boosting SEO and Speed in Modern Web Development',
        author: 'Ameni Ben Saada',
        url: 'https://dev.to/amenibensaada/server-side-rendering-ssr-boosting-seo-and-speed-in-modern-web-development-4l6h',
        likes: 2
      }
    ]

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})