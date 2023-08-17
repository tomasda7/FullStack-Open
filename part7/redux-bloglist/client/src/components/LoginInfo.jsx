import { useSelector } from 'react-redux'
import LogoutButton from './LogoutButton'

const LoginInfo = () => {
  const user = useSelector((state) => state.user)

  return (
    <>
      <p>
        <em>{user.name}</em> logged in
      </p>
      <LogoutButton />
    </>
  )
}

export default LoginInfo
