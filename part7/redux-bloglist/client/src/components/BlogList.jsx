import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import LoginInfo from './LoginInfo'
import { Link } from 'react-router-dom'
import Menu from './Menu'

const BlogsList = () => {
  const blogStyle = {
    backgroundColor: 'black',
    padding: 15,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const listStyle = {
    listStyleType: 'none'
  }

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const blogs = useSelector((state) => state.blogs)

  const blogFormRef = useRef()

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

  return (
    <div>
      <Menu />
      <LoginInfo />

      <h2>Blogs</h2>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <ul style={listStyle}>
        {blogs.map((blog) => (
          <li style={blogStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogsList
