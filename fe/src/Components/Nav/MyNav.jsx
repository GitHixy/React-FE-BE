import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import OctoBooks from '../../Assets/OctoBooks.webp'

function MyNav() {
  return (
    <Navbar expand="lg" className="bg-dark text-white">
      <Container>       
        <Navbar.Brand href="#home" className='text-white'><img
            alt=""
            src= {OctoBooks}
            width="100" 
            height="100" 
            className="d-inline-block  rounded-circle "
          /> OctoBooks</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className='text-white'>Home</Nav.Link>
            <Nav.Link href="#link" className='text-white'>Link</Nav.Link>
            <Nav.Link href="#link" className='text-white'>About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;