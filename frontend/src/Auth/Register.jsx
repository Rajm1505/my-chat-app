import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  // MDBFile,
  MDBRadio
}
from 'mdb-react-ui-kit';
import Navbar from "../Navbar";


function Register() {

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  function handleRegister(event) {
    event.preventDefault();
    console.log(formData);
    
    
    axios
    .post("http://localhost:3100/user/register",formData).then(function(response){
      console.log(response);
      navigate("/login")
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
                <MDBInput label='Name' name='name' type='text' id='formWhite' contrast onChange={handleInputChange}/>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
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
              
              <div className="d-flex flex-row align-items-center mb-4 ms-2">
              
              <MDBRadio name='gender' id='inlineRadio1' label='Male' value='M' inline  onChange={handleInputChange} />
              <MDBRadio name='gender' id='inlineRadio2' label='Female' value='F' inline onChange={handleInputChange} />
              </div>
              {/* <div className="d-flex flex-row align-items-center mb-4">
                <label className='text-white w-50'>Profile Img</label>
                <MDBIcon fas icon="camera me-3" size='lg' />
                <MDBFile id='customFile' name='avatar' onChange={handleImageChange}/>
              </div> */}

              <button className='btn btn-outline-primary mb-4 ms-5 ' size='lg' type='submit'>Sign Up</button>

              <p>Already have an account? <a href="/login" className='text-warning'>Sign in</a></p>

              </form>
            </MDBCol>
            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <img src='./images/Register.png' className="w-75"/>
            </MDBCol>

          </MDBRow>
        

    </MDBContainer>
    </>
  );
}

export default Register;