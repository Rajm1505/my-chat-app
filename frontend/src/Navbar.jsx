import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

const url = window.location.href;
console.log(url)
let check=0;
console.log(check)


if((url === "http://localhost:3000/") || (url === "http://localhost:3000/contactus") || (url === "http://localhost:3000/aboutus")){
  check=1;
}
else{
  check=0;
}



function NavBar() {

  const navigate = useNavigate();
  
  function handleContactUs(){
    navigate('/contactus');
  }

  function handleAboutUs(){
    navigate('/aboutus');
  }

  function handleRegister(){
    navigate('/register');
  }

  function handleLogin(){
    navigate('/login');
  }

  return (
    <>
      <Navbar collapseOnSelect  style={{background:"black"}} variant="dark">
        <Container>
          <Navbar.Brand href='/'>MyChatApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className="me-auto">
              <Nav.Link onClick={handleContactUs}>Contact Us</Nav.Link>
              <Nav.Link onClick={handleAboutUs}>About Us</Nav.Link>
              {console.log(check)}
              {
              <>
                {check ?    
                <>
                  <Nav.Link onClick={handleRegister}>Register</Nav.Link>
                  <Nav.Link onClick={handleLogin}>Login</Nav.Link>
                </>
                  : ""}
              </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
  );
}

export default NavBar;