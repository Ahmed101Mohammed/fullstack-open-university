const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) =>
{
  const total = blogs.reduce((sum, item) => sum + item.likes, 0)
  return total
}

const favoriteBlog = (blogs) =>
{
  let mostLikedBlog = blogs.length > 0 ? blogs[0] : null
  for(let blog of blogs)
  {
    if(blog.likes > mostLikedBlog.likes) mostLikedBlog = blog
  }
  if(mostLikedBlog)
  {
    const { title, author, likes } = mostLikedBlog
    mostLikedBlog = { title, author, likes }
  }
  return mostLikedBlog
}

const mostBlogs = (blogs) =>
{
  const authors = {}
  for(let blog of blogs)
  {
    if(authors[blog.author])
    {
      authors[blog.author] += 1
    }
    else
    {
      authors[blog.author] = 1
    }
  }

  let mostBloger = null
  for(const [author, blogsNumber] of Object.entries(authors))
  {
    if(!mostBloger)
    {
      mostBloger = { author, blogs: blogsNumber }
    }
    else if(blogsNumber > mostBloger.blogs)
    {
      mostBloger = { author, blogs: blogsNumber }
    }
  }

  return mostBloger
}

const mostLikes = (blogs) =>
{
  const authors = {}
  for(let blog of blogs)
  {
    if(authors[blog.author])
    {
      authors[blog.author] += blog.likes
    }
    else
    {
      authors[blog.author] = blog.likes
    }
  }

  let mostLikes = null
  for(const [author, blogsLikesTotal] of Object.entries(authors))
  {
    if(!mostLikes)
    {
      mostLikes = { author, likes: blogsLikesTotal }
    }
    else if(blogsLikesTotal > mostLikes.likes)
    {
      mostLikes = { author, likes: blogsLikesTotal }
    }
  }

  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}