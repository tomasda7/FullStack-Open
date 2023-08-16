import { useSelector } from 'react-redux'
import LogoutButton from './LogoutButton'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getLoggedUser } from '../reducers/userReducer'
import { getUsers } from '../reducers/usersReducer'

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
      <p>users</p>
    </>
  )
}

export default Users
