import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import LoginInfo from './LoginInfo'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)
  console.log(users)

  return (
    <>
      <LoginInfo />

      <h2>Users</h2>

      <Table bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Users
