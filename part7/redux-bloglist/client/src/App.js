import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useNavigate, useMatch } from 'react-router-dom'
import { initalizeBlogs } from './reducers/blogReducer'
import { getLoggedUser, logIn } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import { getUsers } from './reducers/usersReducer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import BlogsList from './components/BlogList'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLoggedUser())
    dispatch(initalizeBlogs())
    dispatch(getUsers())
  }, [dispatch])

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      dispatch(logIn(username, password))

      setUsername('')
      setPassword('')

      navigate('/blogs')
    } catch (error) {
      dispatch(setNotification(error, 'error', 5))
    }
  }

  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')

  const user = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null

  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

  return (
    <div className="container">
      <h1>Blog App</h1>

      <Notification />

      <Routes>
        <Route path="/users/:id" element={<User user={user} />} />
        <Route path="blogs/:id" element={<Blog blog={blog} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs" element={<BlogsList />} />
        <Route
          path="/"
          element={
            <Togglable buttonLabel="log in">
              <LoginForm
                handleSubmit={handleLogin}
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
              />
            </Togglable>
          }
        />
      </Routes>
    </div>
  )
}

export default App
