import { useEffect } from 'react'
import LoginInfo from './LoginInfo'
import Menu from './Menu'
import { useDispatch } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  })

  return (
    <>
      <Menu />
      <LoginInfo />

      <div>
        <h2>{user.name}</h2>

        <h3>Added Blogs</h3>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default User
