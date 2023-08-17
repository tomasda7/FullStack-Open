import LoginInfo from './LoginInfo'
import Menu from './Menu'

const User = ({ user }) => {
  if (!user) {
    return null
  }

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
