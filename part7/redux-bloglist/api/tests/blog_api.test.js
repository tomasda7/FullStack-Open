const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb } = require('../utils/blog_api_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    let blogObj = new Blog(blog)
    await blogObj.save()
  }
})

const token = process.env.TOKEN

describe('Fetch data functionalities tests', () => {

  test('the blogs are returned in the correct amount and as JSON', async () => {

    const response = await api
        .get('/api/blogs')
        .set({ Authorization: `Bearer ${token}` })
        .expect(200)
        .expect('Content-Type', /application\/json/)
      expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('the unique identifier property of blogs should be named id', async () => {

    const blogs = await blogsInDb()

    blogs.forEach(blog => {
      expect(blog).toHaveProperty('id')
      expect(blog.id).toBeDefined()
    })
  })
})

describe('Send data functionalities tests', () => {

  test('a valid blog can be added', async () => {

    const validBlog = {
      title: "Valid blog",
      author: "Valid author",
      url: "http//ValidSite.com",
      likes: 444
    }

    await api.post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(validBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await blogsInDb()

    expect(blogs).toHaveLength(initialBlogs.length+1)
    expect(blogs[blogs.length-1].title).toContain(newBlog.title)
    expect(blogs[blogs.length-1].author).toContain(newBlog.author)
    expect(blogs[blogs.length-1].url).toContain(newBlog.url)
    expect(blogs[blogs.length-1].likes).toBe(newBlog.likes)
  })

  test('if a blog is added without the likes property, must be 0 by default', async () => {

    const blogWithoutLikes = {
      title: "Recipes blog",
      author: "Chef Mark",
      url: "http//ForDinner.com"
    }

    await api.post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(blogWithoutLikes)
      .expect(201)

    const blogs = await blogsInDb()

    expect(blogs[blogs.length-1].likes).toBe(0)
  })

  test('a blog without the title or url properties must be rejected', async () => {
    const invalidBlog = {
      author: "Tomas",
      likes: 400
    }

    await api.post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(invalidBlog)
      .expect(400)

    const blogs = await blogsInDb()

    expect(blogs).toHaveLength(initialBlogs.length)
  })

  test('adding a blog fails with the status code 401 Unauthorized if a token is not provided', async () => {

    const blogWithoutToken = {
      title: "Dummy blog",
      author: "Dummy author",
      url: "http//DummySite.com",
      likes: 401
    }

    await api.post('/api/blogs')
      .send(blogWithoutToken)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogs = await blogsInDb()

    expect(blogs).toHaveLength(initialBlogs.length)
  })
})

describe('Delete data functionalities tests', () => {

  test('a blog can be deleted', async () => {

    const blogsBefore = await blogsInDb()

    const blogToDelete = blogsBefore[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(204)

    const blogsAfter = await blogsInDb()

    expect(blogsAfter).toHaveLength(initialBlogs.length-1)

    const titles = blogsAfter.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('Update data functionalities tests', () => {

  test('a blog can be updated', async () => {

    const blogsBefore = await blogsInDb()

    const blogToUpdate = blogsBefore[0]

    const updates = {
      title: "Updating blog",
      author: "Leston7",
      url: "http//www.up.com",
      likes: 1024,
    }

    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send(updates)
      .expect(200)

    const blogsAfter = await blogsInDb()

    expect(blogsAfter).toHaveLength(initialBlogs.length)

    expect(blogsAfter[0].title).toContain(updates.title)
    expect(blogsAfter[0].author).toContain(updates.author)
    expect(blogsAfter[0].url).toContain(updates.url)
    expect(blogsAfter[0].likes).toBe(updates.likes)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

//npm test -- tests/blog_api.test.js
