import { useState } from 'react'
import DeleteButton from './DeleteButton'

const Blog = ({ blog, likeHandler, deleteHandler, userId }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetail, setShowDetail] = useState(false)


  const changeVisibility = () => {
    setShowDetail(!showDetail)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <h4>{blog.title}</h4>
        <h4>{blog.author}</h4>
        {showDetail &&
         <div>
           <h4>{blog.url}</h4>
           <h4>{blog.likes}</h4>
           <button
             key={blog.id}
             onClick={() =>
               likeHandler(blog.id)}>
            like
           </button>
           {/* <h4>By {blog.user.name}</h4> */}
           <DeleteButton
             blogId={blog.id}
             /* ownerId={blog.user.id} */
             userId={userId}
             handleDelete={deleteHandler}
           />
         </div>
        }
      </div>
      <div>
        <button onClick={changeVisibility}>{showDetail ? 'hide' : 'view'}</button>
      </div>
    </div>
  )
}

export default Blog
