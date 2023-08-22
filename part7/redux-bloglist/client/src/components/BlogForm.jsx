import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleNewBlog = (e) => {
    const value = e.target.value
    setNewBlog({
      ...newBlog,
      [e.target.name]: value
    })
  }

  const addBlog = (e) => {
    e.preventDefault()

    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })

    setNewBlog({ title: '', author: '', url: '' })
  }

  const margin = {
    marginTop: 10,
    marginLeft: 10
  }

  return (
    <>
      <h2>Create a new blog</h2>

      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            id="title"
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleNewBlog}
          />
          <Form.Label>Author:</Form.Label>
          <Form.Control
            id="author"
            type="text"
            name="author"
            value={newBlog.author}
            onChange={handleNewBlog}
          />

          <Form.Label>URL:</Form.Label>
          <Form.Control
            id="url"
            aria-label="Url"
            type="text"
            name="url"
            value={newBlog.url}
            onChange={handleNewBlog}
          />
          <Button style={margin} variant="dark" type="submit">
            Save
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default BlogForm
