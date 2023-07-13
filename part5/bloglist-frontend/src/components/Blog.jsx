import { useState } from "react"

const Blog = ({blog, likeHandler, deleteHandler}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetail, setShowDetail] = useState(false)

  const hideWhenVisible = { display: showDetail ? 'none' : '' }
  const showWhenVisible = { display: showDetail ? '' : 'none' }

  const changeVisibility = () => {
    setShowDetail(!showDetail)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <h4>{blog.title} {blog.author}</h4>
      </div>
      <div style={showWhenVisible}>
        <h4>{blog.title} {blog.author}</h4>
        <p>{blog.url}</p>
        <p>{blog.likes}</p> <button key={blog.id} onClick={() => likeHandler(blog.id)}>like</button>
        <p>By {blog.user.name}</p>
        <div>
        <button key={blog.id} onClick={() => deleteHandler(blog.id)}>delete</button>
        </div>
      </div>
      <div>
        <button onClick={changeVisibility}>{showDetail ? 'hide' : 'view'}</button>
      </div>
    </div>
  )
}

export default Blog
