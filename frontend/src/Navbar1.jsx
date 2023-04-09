import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ReactRoundedImage from "react-rounded-image";
import { useNavigate } from 'react-router-dom';
import React , { useState,useEffect } from 'react';
import { ChatState } from './Context/ChatProvider';

function NavBar() {

  const [query, setQuery] = useState("")
  const [userGender, setUserGender] = useState("M")
  const navigate = useNavigate()
  const {user} = ChatState()
  
  useEffect(() => {
    
    if(user){
      setUserGender(user.gender);
    }

  }, [user])
  


  function getSearchQuery(event){
    setQuery(event.target.value)
  }
  
  function handleSearch(event){

    navigate(`/search/${query}`)
  }
  function handleLogout(event){
    localStorage.removeItem('USER');
    navigate('/')
    }

  return (
      <Navbar collapseOnSelect expand="lg" style={{background:'black'}} variant="dark">
        <Container>
          <Navbar.Brand className='ms-5' href="/">MyChatApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">

              <Form className="d-flex ms-auto m-2">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={getSearchQuery}
                  />
                <Button variant="outline-success" onClick={handleSearch}>Search</Button>
              </Form>
              <Nav className="ms-auto me-5">
                <div className='d-flex justify-content-evenly mt-1  '>
                  <Nav.Link href="contactus">Contact Us</Nav.Link>
                  <Nav.Link href="aboutus">About Us</Nav.Link>
                  <Nav.Link href="../friendlist" >Your Friends</Nav.Link>
                    <Nav.Link onClick={handleLogout} className='me-3'>Log out</Nav.Link>
                </div>
                  <Nav.Link href="/profile" className=''>
                  <ReactRoundedImage
                    image={`${userGender === "M" ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp" : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"}`}         
                    roundedSize="0"
                    imageWidth="40"
                    imageHeight="40"
                  />
                  </Nav.Link>
                 
              </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;