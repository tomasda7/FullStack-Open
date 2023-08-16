import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    navigate('/')
  }

  return <button onClick={handleLogout}>logout</button>
}

export default LogoutButton
