const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, blogs: 1 })
  res.json(blogs)
})

blogsRouter.post('/', userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body

  const user = req.user

  if(!title || !url) {
    return res.status(400).json({
      error: 'title and url is mandatory data'
    })
  }

  const newBlog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
    user: user.id
  })

  const savedBlog = await newBlog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const id = req.params.id

  const blog = await Blog.findById(id)

  const user = req.user

  if(blog.user.toString() !== user.id.toString()) {
    return res.status(401).json({
      error: 'this blog is owned by another user'
    })
  }

  await Blog.findByIdAndRemove(blog.id)

  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const { title, author, url, likes } = req.body

  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })

  res.json(updatedBlog)
})

module.exports = blogsRouter
