const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { usersInDb } = require('../utils/blog_api_helper')

describe('Users aggregation tests', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('supersecret', 10)
    const user = new User({ username: 'root', password: passwordHash })

    await user.save()
  })

  test('user creation succeeds with a fresh username', async () => {

    const usersBefore = await usersInDb()

    const newUser = {
      username: 'leston7',
      name: 'Tomas',
      password: 'superSecretPass'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await usersInDb()

    expect(usersAfter).toHaveLength(usersBefore.length+1)

    const usernames = usersAfter.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {

    const usersBefore = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'dummyUser',
      password: 'dummyPass'
    }

    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAfter = await usersInDb()

    expect(usersAfter).toEqual(usersBefore)
  })

  test('users without the username or password properties must be rejected', async () => {

    const usersBefore = await usersInDb()

    const invalidUser = {
      name: "Tomas"
    }

    await api.post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await usersInDb()

    expect(usersAfter).toHaveLength(usersBefore.length)
  })

  test('users with a username length of less than 3 characters must be rejected', async () => {
    const usersBefore = await usersInDb()

    const invalidUsername = {
      username: 'ro',
      name: 'dummyUser',
      password: 'dummyPass'
    }

    await api.post('/api/users')
      .send(invalidUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await usersInDb()

    expect(usersAfter).toHaveLength(usersBefore.length)
  })

  test('users with a password length of less than 3 characters must be rejected', async () => {
    const usersBefore = await usersInDb()

    const invalidUsername = {
      username: 'leston',
      name: 'Tomas',
      password: 'du'
    }

    await api.post('/api/users')
      .send(invalidUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await usersInDb()

    expect(usersAfter).toHaveLength(usersBefore.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

//npm test -- tests/user_api.test.js
