import { getAll, create, update, remove, addComment } from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      return [...state, action.payload]
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    }
  }
})

export const initalizeBlogs = () => {
  return async (dispatch) => {
    const blogs = await getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content, user) => {
  return async (dispatch) => {
    const newBlog = await create(content)
    dispatch(appendBlog({ ...newBlog, user: user }))
  }
}

export const likeBlog = (id, user) => {
  return async (dispatch) => {
    const blogs = await getAll()

    const blogToLike = blogs.find((blog) => blog.id === id)

    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1
    }

    const updBlog = await update(id, likedBlog)
    dispatch(
      updateBlog({
        ...updBlog,
        user: user
      })
    )
  }
}

export const addNewComment = (id, content, user) => {
  return async (dispatch) => {
    const updBlog = await addComment(id, { content: content })
    dispatch(updateBlog({ ...updBlog, user: user }))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await remove(id)
    dispatch(deleteBlog(id))
  }
}

export const { appendBlog, setBlogs, updateBlog, deleteBlog } =
  blogSlice.actions
export default blogSlice.reducer
