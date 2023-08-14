import { useState } from 'react'

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

  return (
    <>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          Title: <input id='title' aria-label='Title' type='text' name='title' value={newBlog.title} onChange={handleNewBlog}/>
        </div>
        <div>
          Author: <input id='author' aria-label='Author' type='text' name='author' value={newBlog.author} onChange={handleNewBlog}/>
        </div>
        <div>
          URL: <input id='url' aria-label='Url' type='text' name='url' value={newBlog.url} onChange={handleNewBlog}/>
        </div>
        <div>
          <button type='submit'>Save</button>
        </div>
      </form>
    </>
  )
}

export default BlogForm
