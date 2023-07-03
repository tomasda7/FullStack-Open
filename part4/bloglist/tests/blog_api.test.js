const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

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

beforeEach(async() => {
    await Blog.deleteMany({})
    let blogObj = new Blog(initialBlogs[0])
    await blogObj.save()
    blogObj = new Blog(initialBlogs[1])
    await blogObj.save()
})

test('the blogs are returned in the correct amount and as JSON', async () => {

  const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('the unique identifier property of blogs should be named id', async () => {

  const response = await api.get('/api/blogs')

  const blogs = response.body.map(blog => blog)

  blogs.forEach(blog => {
    expect(blog).toHaveProperty('id')
    expect(blog.id).toBeDefined()
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Dummy blog",
    author: "Dummy author",
    url: "http//DummySite.com",
    likes: 444
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const blogs = response.body.map(blog => blog)

  expect(response.body).toHaveLength(initialBlogs.length+1)
  expect(blogs[blogs.length-1].title).toContain('Dummy blog')
  expect(blogs[blogs.length-1].author).toContain('Dummy author')
  expect(blogs[blogs.length-1].url).toContain('http//DummySite.com')
  expect(blogs[blogs.length-1].likes).toBe(444)
})

/* blogs.forEach(blog => {
  expect(blog).toHaveProperty('title')
  expect(blog.title).toBeDefined()
  expect(blog).toHaveProperty('author')
  expect(blog.author).toBeDefined()
  expect(blog).toHaveProperty('url')
  expect(blog.url).toBeDefined()
  expect(blog).toHaveProperty('likes')
  expect(blog.likes).toBeDefined()
}) */

afterAll(async () => {
    await mongoose.connection.close()
})

//npm test -- tests/blog_api.test.js
