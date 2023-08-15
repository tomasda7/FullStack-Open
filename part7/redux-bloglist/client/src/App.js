import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  initalizeBlogs,
  createBlog,
  likeBlog,
  removeBlog
} from './reducers/blogReducer'
import { getLoggedUser, logIn } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initalizeBlogs())
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort(
    (blogA, blogB) => blogB.likes - blogA.likes
  )

  useEffect(() => {
    dispatch(getLoggedUser())
  }, [dispatch])

  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      dispatch(logIn(username, password))

      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  const addBlog = async (blogObj) => {
    try {
      dispatch(createBlog(blogObj, user))
      blogFormRef.current.toggleVisibility()
      dispatch(
        setNotification(
          `"${blogObj.title}" by ${user.username} was added successfully`,
          'success',
          5
        )
      )
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }

  const addLike = async (id) => {
    try {
      dispatch(likeBlog(id, user))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }

  const deleteBlog = async (id) => {
    try {
      const confirmBlog = blogs.find((blog) => blog.id === id)
      if (
        window.confirm(
          `Are you sure to delete the blog "${confirmBlog.title}"?`
        )
      ) {
        dispatch(removeBlog(id))
        dispatch(
          setNotification(
            `${confirmBlog.title} was deleted successfully!`,
            'success',
            5
          )
        )
      }
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }

  return (
    <div>
      <h2>Blogs</h2>

      <Notification />

      {!user && (
        <Togglable buttonLabel="log in">
          <LoginForm
            handleSubmit={handleLogin}
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
        </Togglable>
      )}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              userId={user ? user.id : user}
              likeHandler={addLike}
              deleteHandler={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
