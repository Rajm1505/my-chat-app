import React, {useState} from 'react';
import axios from 'axios'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBInput,
  MDBIcon,
}
from 'mdb-react-ui-kit';
import Navbar from "../Navbar";

function Register() {

  const [formData, setFormData] = useState({});

  function handleRegister(event) {
    event.preventDefault();
    console.log(formData);
    var data = JSON.stringify(formData);
    
    axios
    .post("http://localhost:3100/register",data).then(function(response){
      console.log(response);
    }).then(function(error){
      console.log(error);
    })
  }
  

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  return (
    <>
    <Navbar />
    <MDBContainer className="vh-100" style={{background:"black"}} fluid>
     
          <MDBRow>
            <MDBCol className='mt-5 order-2 order-lg-1 d-flex flex-column align-items-center text-white'>

              <form onSubmit={handleRegister}>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up </p>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Username' name='username' type='text' id='formWhite' contrast onChange={handleInputChange}/>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Email' name='email' type='email' id='formWhite' contrast onChange={handleInputChange} />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput label='Password' name='password' type='password' id='formWhite' contrast onChange={handleInputChange} />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput label='Confirm Password' type='password' id='formWhite' contrast onChange={handleInputChange} />
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Phone' name='phone' type='number' id='formWhite' contrast onChange={handleInputChange} />
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Gender' name='gender' type='text' id='formWhite' contrast  onChange={handleInputChange}/>
              </div>

              <MDBBtn className='mb-4' size='lg' type='submit'>Sign Up</MDBBtn>

              <p>Already have an account? <a href="/login" className='text-warning'>Sign in</a></p>

              </form>
            </MDBCol>

              {/* <img src='./img/signin.jpg' alt='error'/> */}
            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
            </MDBCol>

          </MDBRow>
        

    </MDBContainer>
    </>
  );
}

export default Register;