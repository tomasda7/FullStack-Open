const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { usersInDb } = require('../utils/blog_api_helper')

describe('there is initially one user in db', () => {

    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('supersecret', 10)
        const user = new User({ username: 'root', passwordHash })

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
})

afterAll(async () => {
    await mongoose.connection.close()
})

//npm test -- tests/user_api.test.js
