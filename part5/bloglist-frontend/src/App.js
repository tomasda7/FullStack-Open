import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  useEffect( () => {
    const fetchBlogs = async () => {
      const initalBlogs = await blogService.getAll()
      setBlogs(initalBlogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(error) {
      setIsError(true)
      setMessage(error.response.data.error)
      setTimeout(() => {
        setIsError(false)
        setMessage(null)
      }, 5000)
    }

  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  const handleNewBlog = (e) => {
    const value = e.target.value
    setNewBlog({
      ...newBlog,
      [e.target.name]: value
    })
  }

  const addBlog = async (e) => {
    e.preventDefault()

    const blogObj = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }

    try {
      const newBlog = await blogService.create(blogObj)
      setBlogs(blogs.concat(newBlog))
      setNewBlog({ title: '', author: '', url: '' })
      setMessage(`a new blog "${newBlog.title}" by ${user.username} was added successfully`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch(error) {
      setIsError(true)
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
        setIsError(false)
      }, 5000)
    }
  }

  if(user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <Notification message={message} style={isError ? 'error' : 'success'}/>
        <form onSubmit={handleLogin}>
          <div>
            username:
            <input
            type='text'
            value={username}
            autoComplete='username'
            name='Username'
            onChange={({ target }) =>  setUsername(target.value) }
            />
          </div>
          <div>
            password:
            <input
            type='password'
            value={password}
            autoComplete='current-password'
            name='Password'
            onChange={({ target }) => setPassword(target.value) }
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} style={isError ? 'error' : 'success'}/>

      <p>{user.name} logged in</p><button onClick={handleLogout}>Logout</button>

      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title: <input type='text' name='title' value={newBlog.title} onChange={handleNewBlog}/>
        </div>
        <div>
          Author: <input type='text' name='author' value={newBlog.author} onChange={handleNewBlog}/>
        </div>
        <div>
          URL: <input type='text' name='url' value={newBlog.url} onChange={handleNewBlog}/>
        </div>
        <div>
         <button type='submit'>Send</button>
        </div>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
