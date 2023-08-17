import { useDispatch, useSelector } from 'react-redux'
import DeleteButton from './DeleteButton'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import LoginInfo from './LoginInfo'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

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

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <LoginInfo />

      <h2>Blogs</h2>
      <div>
        <h3>
          {blog.title} {blog.author}
        </h3>
        <a href={blog.url}>{blog.url}</a>
        <h4>{blog.likes} likes</h4>
        <button key={blog.id} onClick={() => addLike(blog.id)}>
          like
        </button>
        <h4>By {blog.user.name}</h4>
        <DeleteButton
          blogId={blog.id}
          ownerId={blog.user.id}
          userId={user.id}
          handleDelete={deleteBlog}
        />
      </div>
    </div>
  )
}

export default Blog
