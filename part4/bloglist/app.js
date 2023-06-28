const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const password = 'tTgH0cBEOkKJyfai'
const mongoURL = `mongodb+srv://tomasda7:${password}@open.8iruedz.mongodb.net/bloglistApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(mongoURL)
  .then(() => {
    console.log('Connected to MongoDB successfully')
  })
  .catch((error) => {
    console.log('Error in connection with MongoDB: ', error.message)
  })

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (req, res) => {
    Blog.find({}).then(blogs => {
        res.json(blogs)
    })
})

app.post('/api/blogs', (req, res) => {
    const blog = new Blog(req.body)

    blog.save().then(result => {
        res.status(201).json(result)
    })
})

module.exports = app
