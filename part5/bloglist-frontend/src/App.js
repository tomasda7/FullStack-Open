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

  useEffect( () => {
    const fetchBlogs = async () => {
      const initalBlogs = await blogService.getAll()
      setBlogs(initalBlogs)
    }
    fetchBlogs()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(error) {
      setIsError(true)
      setMessage('Wrong Credentials')
      setTimeout(() => {
        setIsError(false)
        setMessage(null)
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
            name='Username'
            onChange={({ target }) =>  setUsername(target.value) }
            />
          </div>
          <div>
            password:
            <input
            type='password'
            value={password}
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

      <p>{user.name} logged in</p>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
