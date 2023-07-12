
const BlogForm = ({ onSubmit, value, onChange }) => {

  return (
    <>
      <h2>Create a new blog</h2>

      <form onSubmit={onSubmit}>
        <div>
          Title: <input type='text' name='title' value={value.title} onChange={onChange}/>
        </div>
        <div>
          Author: <input type='text' name='author' value={value.author} onChange={onChange}/>
        </div>
        <div>
          URL: <input type='text' name='url' value={value.url} onChange={onChange}/>
        </div>
        <div>
         <button type='submit'>Save</button>
        </div>
      </form>
    </>
  )
}

export default BlogForm
