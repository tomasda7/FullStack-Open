const { error } = require('./loggers')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint.' })
}

const errorHandler = (err, request, response, next) => {
  error(err.message)

  if(err.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if(err.name === 'ValidationError') {
    return response.status(400).json({ error: err.message })
  }
  else if(err.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: err.message })
  }

  next(err)
}

const tokenExtractor = (request, response, next) => {

  const authorization = request.get('authorization')

  if(authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }

  next()
}

const userExtractor = async (request, response, next) => {

  const token = request.token

  if(!token) {
    return response.status(401).json({
      error: 'invalid token or not provided'
    })
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  request.user = await User.findById(decodedToken.id)

  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
