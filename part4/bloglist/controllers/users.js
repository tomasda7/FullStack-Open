const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const usersInDB = await User.find({ username: username})

  if(!username || !password) {
    return res.status(400).json({
      error: 'Mandatory data is missing.'
    })
  }
  else if(password.length < 3) {
    return res.status(400).json({
      error: 'password must contain at least 3 characters'
    })
  }
  else if(usersInDB.length) {
    return res.status(400).json({
      error: 'expected `username` to be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username: username,
    name: name,
    password: passwordHash
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

module.exports = usersRouter
