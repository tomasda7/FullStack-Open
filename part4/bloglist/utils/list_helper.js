const _ = require('lodash')

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)

  return likes.length ? likes.reduce((total,curr) => total + curr) : 0
}

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map(blog => blog.likes))

  return blogs.map(blog => {
    return  { title: blog.title, author: blog.author, likes: blog.likes }
  }).find(blog => blog.likes === mostLikes)
}

const mostBlogs = (blogs) => {
  const count = _.countBy(blogs, (obj) => {
    return obj.author
  })

  const mostBlogsAuthor = _.maxBy(_.keys(count), (key) => {
    return count[key]
  })

  return {
    author: mostBlogsAuthor,
    blogs: count[mostBlogsAuthor]
  }
}

const mostLikes = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author')

  let sumLikes = _.mapValues(blogsByAuthor, (blogs) => {
    return _.reduce(blogs, (total, blog) => {
      return total + blog.likes
    },0)
  })

  const mostLikesAuthor = _.maxBy(_.toPairs(sumLikes), (pair) => pair[1])

  return {
    author: mostLikesAuthor[0],
    likes: mostLikesAuthor[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
