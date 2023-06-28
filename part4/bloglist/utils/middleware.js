const { error } = require('./loggers')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint.' })
}

const errorHandler = (err, request, response, next) => {
  error(err.message)

  if(err.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if(err.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(err)
}

module.exports = {
    unknownEndpoint,
    errorHandler
}
