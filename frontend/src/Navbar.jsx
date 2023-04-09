import React, { useEffect, useRef } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { ChatState } from './Context/ChatProvider';




function NavBar() {
  let check = useRef(0);
  
  const {user} = ChatState();
    
  
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
  
  function handleLogout(){
    localStorage.removeItem('USER');
    navigate('/')
  }
  function handleFriends(){
    navigate('/friendlist')
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
              
              <>
                {user &&    
                <>
                  <Nav.Link onClick={handleFriends}>Your Friends</Nav.Link>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
                }{
                  !user &&
                <>
                  <Nav.Link onClick={handleRegister}>Register</Nav.Link>
                  <Nav.Link onClick={handleLogin}>Login</Nav.Link>
                </>
                }
                  
              </>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
  );
}

export default NavBar;