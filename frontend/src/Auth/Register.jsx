import React from 'react';
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
  return (
    <>
    <Navbar />
    <MDBContainer className="vh-100" style={{background:"black"}} fluid>
     
          <MDBRow>
            <MDBCol className='mt-5 order-2 order-lg-1 d-flex flex-column align-items-center text-white'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up </p>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Username' type='text' id='formWhite' contrast />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput label='Password' type='password' id='formWhite' contrast />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput label='Confirm Password' type='password' id='formWhite' contrast />
              </div>

              <MDBBtn className='mb-4' size='lg'>Sign Up</MDBBtn>

              <p>Already have an account? <a href="/login" className='text-warning'>Sign in</a></p>

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