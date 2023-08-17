import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { initalizeBlogs } from './reducers/blogReducer'
import { getLoggedUser, logIn } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import Users from './components/Users'
import BlogsList from './components/BlogList'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initalizeBlogs())
    dispatch(getLoggedUser())
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

  return (
    <div className="container">
      <h1>Blog App</h1>

      <Notification />

      <Routes>
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
