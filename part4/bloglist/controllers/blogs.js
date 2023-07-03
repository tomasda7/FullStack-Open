const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const {title, author, url, likes } = req.body

  const newBlog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0
  })

  const savedBlog = await newBlog.save()

  res.status(201).json(savedBlog)
})

module.exports = blogsRouter
