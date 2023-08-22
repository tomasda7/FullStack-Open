import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="me-auto">
        <Nav.Link href="#" as="span">
          <Link style={padding} to={'/blogs'}>
            Blogs
          </Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link style={padding} to={'/users'}>
            users
          </Link>
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default Menu
