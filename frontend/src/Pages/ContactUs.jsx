import React from 'react';
import Navbar from '../Navbar';
import { MDBInput, MDBIcon, MDBContainer, MDBCol, MDBTextArea, MDBBtn } from 'mdb-react-ui-kit';

function ContactUs(){
    return(
        <>
            <Navbar/>
            <MDBContainer className="vh-100" fluid>
                <div className="row ">
                    <MDBCol className='mt-5 mx-5 order-2 order-lg-1 d-flex flex-column align-items-center text-white'>
                        <p className='mt-5' style={{fontSize:'3vw', fontWeight:'bold'}}>Contact Us</p>
                        <div className="d-flex flex-row align-items-center mb-4 ">
                            <MDBIcon fas icon="user me-3" size='lg'/>
                            <MDBInput label='Username' type='text' id='formWhite' contrast />
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4 ">
                            <MDBIcon fas icon="at me-3" size='lg' />
                            <MDBInput label='Email' type='email' id='formWhite' contrast />
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4 ">
                            <MDBIcon far icon="envelope me-3" size='lg' />
                            <MDBTextArea label='Message' id='forWhite' rows={3} contrast />
                        </div>
                        
                        <MDBBtn className='mb-4' size='md'>Send</MDBBtn>

                        <p>Don't have an account? <a href="/register" className='text-warning'>Sign up</a></p>

                    </MDBCol>
                    <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                    </MDBCol>
                </div>
            </MDBContainer>
        </>
    )
}

export default ContactUs;