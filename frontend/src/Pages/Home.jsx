import React from 'react';
import Navbar from '../Navbar';
import { MDBBtn, MDBContainer, MDBCol } from 'mdb-react-ui-kit';

function Home(){
    return(
        <>
            <Navbar/>
            <MDBContainer className="vh-100" fluid>
                <div className="row ">
                    <MDBCol className='mt-5 mx-5 order-2 order-lg-1 d-flex flex-column align-items-center text-white'>
                        <p className='mt-5' style={{fontSize:'4vw', fontWeight:'bold'}}>MyChatApp</p>
                        <p style={{fontSize:'2vw', fontWeight:'bold'}}>Let Your Fingers Do <br /> the Walking Through <br /> the Chat.</p>
                        <MDBBtn style={{backgroundColor:'orange', marginRight:'200px'}} size='lg'>Get Started !</MDBBtn>
                    </MDBCol>
                    <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                    <img src='./images/Home.png'/>
                    </MDBCol>
                </div>
            </MDBContainer>
        </>
    )
}

export default Home;