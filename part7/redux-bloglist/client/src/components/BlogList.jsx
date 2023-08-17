import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog, likeBlog, removeBlog } from '../reducers/blogReducer'
import LogoutButton from './LogoutButton'

const BlogsList = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort(
    (blogA, blogB) => blogB.likes - blogA.likes
  )

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

      <p>{user.name} logged in</p>
      <LogoutButton />

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
  )
}

export default BlogsList
