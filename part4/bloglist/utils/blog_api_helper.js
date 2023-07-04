const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: "Test blog",
      author: "tomasda7",
      url: "http//www.test.com",
      likes: 200,
    },
    {
      title: "Cats blog",
      author: "some cat owner",
      url: "http//welovecats.com",
      likes: 1000,
    }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
}
