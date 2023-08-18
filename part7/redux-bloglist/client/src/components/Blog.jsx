import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import LoginInfo from './LoginInfo'
import Menu from './Menu'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const addLike = async (id) => {
    const blogOwner = blogs.find((blog) => blog.id === id)
    try {
      dispatch(likeBlog(id, blogOwner.user))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <Menu />
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
        <h3>Comments</h3>
        <ul>
          {blog.comments.map((comment, i) => (
            <li key={i}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
