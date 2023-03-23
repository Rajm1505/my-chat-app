import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import NavBar from '../Navbar1';
import Button from 'react-bootstrap/esm/Button';

export default function ProfilePage() {
  return (
    <section>
      <NavBar/>
      <MDBContainer className="d-flex my-5 justify-content-center" style={{height: ''}}>
            <MDBCard>
              <MDBCardBody className='d-flex flex-row'>
                <div className="d-flex flex-column me-5 justify-content-center">
                    <div className="d-flex flex-row">
                        <MDBCardImage
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: '150px' }}
                        fluid />  
                    </div>
                </div>
                <div className="d-flex flex-column mt-3">
                    <div className="d-flex flex-row">
                        <MDBCardText className='me-3'>Full Name:</MDBCardText>
                        <MDBCardText className="text-muted">Johnatan Smith</MDBCardText>
                    </div>
                    <div className="d-flex flex-row">
                        <MDBCardText className='me-3'>Email:</MDBCardText>
                        <MDBCardText className="text-muted">jsmith@gmail.com</MDBCardText>
                    </div>
                    <div className="d-flex flex-row">
                        <MDBCardText className='me-3'>Date of birth:</MDBCardText>
                        <MDBCardText className="text-muted">29/12/2002</MDBCardText>
                    </div>
                    <div className="d-flex flex-row">
                        <MDBCardText className='me-3'>Gender:</MDBCardText>
                        <MDBCardText className="text-muted">Male</MDBCardText>
                    </div>
                    <div className="d-flex flex-row">
                        
                      <Button className='btn btn-warning'>Edit</Button>
                    </div>
                </div>
              </MDBCardBody>
            </MDBCard>
      </MDBContainer>
    </section>
  );
}