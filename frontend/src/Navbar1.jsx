import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ReactRoundedImage from "react-rounded-image";
import MyPhoto from './images/me.png';
import { useNavigate } from 'react-router-dom';
import React , { useState } from 'react';

function NavBar() {

  const [query, setQuery] = useState("")
  const navigate = useNavigate()


  function getSearchQuery(event){
    setQuery(event.target.value)
  }
  
  function handleSearch(event){

    navigate(`/search/${query}`)
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
                <div className='d-flex justify-content-evenly'>
                  <Nav.Link href="#home">Contact Us</Nav.Link>
                  <Nav.Link href="#features">About Us</Nav.Link>
                  <Nav.Link href="#pricing" className='me-3'>Friend List</Nav.Link>
                  <ReactRoundedImage
                    image={MyPhoto}
                    roundedSize="0"
                    imageWidth="40"
                    imageHeight="40"
                  />
                  <NavDropdown id="collasible-nav-dropdown" >
                    <NavDropdown.Item href="#action/3.1" className='mt-2'>Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2" className='mb-2'>Log out</NavDropdown.Item>
                  </NavDropdown>
                </div>
              </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;