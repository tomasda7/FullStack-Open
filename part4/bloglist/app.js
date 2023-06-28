const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')
const config = require('./utils/config')
const { info, error } = require('./utils/loggers')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)

info('Connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    info('Connected to MongoDB successfully')
  })
  .catch((err) => {
    error('Error in connection with MongoDB: ', err.message)
  })

morgan.token('body', (request) => { return JSON.stringify(request.body) })

app.use(morgan(':method :url :status :response-time ms - :body'))
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
