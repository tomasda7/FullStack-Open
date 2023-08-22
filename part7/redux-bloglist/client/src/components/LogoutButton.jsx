import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    navigate('/')
  }

  const margin = {
    marginBottom: 10
  }

  return (
    <Button style={margin} variant="dark" type="button" onClick={handleLogout}>
      logout
    </Button>
  )
}

export default LogoutButton
