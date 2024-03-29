import { useDispatch } from 'react-redux'
import { addNewComment, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import { Button } from 'react-bootstrap'
import LoginInfo from './LoginInfo'
import Menu from './Menu'

const Blog = ({ blog }) => {
  const { reset: resetContent, ...content } = useField('text')

  const dispatch = useDispatch()

  const addLike = async (id) => {
    try {
      dispatch(likeBlog(id, blog.user))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }

  const sendComment = async (e) => {
    e.preventDefault()
    try {
      dispatch(addNewComment(blog.id, content.value, blog.user))
      resetContent()
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }

  if (!blog) {
    return null
  }

  const margin = {
    marginLeft: 10
  }
  const background = {
    backgroundColor: 'black'
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
        <a style={background} href={blog.url}>
          {blog.url}
        </a>
        <h4>{blog.likes} likes</h4>
        <Button key={blog.id} onClick={() => addLike(blog.id)} variant="dark">
          like
        </Button>
        <h4>By {blog.user.name}</h4>
        <h3>Comments</h3>
        <form onSubmit={sendComment}>
          <input {...content} />
          <Button style={margin} type="submit" variant="dark">
            Add comment
          </Button>
        </form>
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
