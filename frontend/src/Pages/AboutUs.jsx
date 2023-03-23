import React from 'react';
import Navbar from '../Navbar';
import { MDBContainer, MDBCol } from 'mdb-react-ui-kit';
 
function AboutUs(){
    return(
        <>
            <Navbar/>
            <MDBContainer className="vh-100" fluid>
                <div className="row ">
                    <MDBCol className='mt-5 mx-5 order-2 order-lg-1 d-flex flex-column align-items-center text-white'>
                        <p className='mt-5' style={{fontSize:'5vw', fontWeight:'bold'}}>About Us</p>
                        <p style={{fontSize:'2vw', fontWeight:'bold'}}>We provide you <br /> Platform to <span className='text-warning'>chat</span> with <br /> your friends and <br /> <span className='text-primary'>family</span>.  </p>
                    </MDBCol>
                    <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                    </MDBCol>
                </div>
            </MDBContainer>
        </>
    )
}

export default AboutUs;