import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getLoggedUser } from '../reducers/userReducer'
import { getUsers } from '../reducers/usersReducer'
import { Table } from 'react-bootstrap'
import LogoutButton from './LogoutButton'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getLoggedUser())
  }, [dispatch])

  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  console.log(users)
  return (
    <>
      <p>{user.name} logged in</p>
      <LogoutButton />

      <h2>Users</h2>

      <Table bordered hover variant="dark">
        <thead>
          <tr>
            <th>Fullname</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Users
