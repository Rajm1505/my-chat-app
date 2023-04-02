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
import { useNavigate } from 'react-router-dom';



function Login() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate()
  
  function handleLogin(event) {
    event.preventDefault();
    
    axios
    .post("http://127.0.0.1:3100/user/login",formData).then((response)=>{

    console.log(response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
      


    }).then(function(error){
      console.log("error",error);
    })
  }
  
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }
  return (
      <>
        <Navbar />
        <MDBContainer className="vh-100" fluid style={{background:"black"}}>
          <MDBRow>
            <MDBCol className='mt-5 order-2 order-lg-1 d-flex flex-column align-items-center text-white'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
            <form action="POST">

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Email' name="email" type='email' id='formWhite' contrast onChange={handleInputChange} />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput label='Password' name="password" type='password' id='formWhite' contrast onChange={handleInputChange} />
              </div>

              <button className='btn btn-outline-primary mb-4 ms-5 ' size='lg' onClick={handleLogin}>Login</button>
            </form>

              <p>Don't have an account? <a href="/register" className='text-warning'>Sign up</a></p>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
            <img src='./images/Login.png' class="w-75"/>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
  );
}

export default Login;