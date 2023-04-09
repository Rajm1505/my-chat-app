import React, { useState,useEffect } from 'react';
import {
  MDBContainer,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import NavBar from '../Navbar1';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import { ChatState } from '../Context/ChatProvider';

export default function ProfilePage() {
  const [profile,setProfile] = useState([])
  const {user} = ChatState();
  
  useEffect(()=>{
    const profile = async()=>{
        try{
            const config = {
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${user.token}`
            }
        };
            
        
            const {data} = await axios.get("http://localhost:3100/user/profile",config)
            console.log(data);
            setProfile(data);
    }catch(error){
        console.log(error);
    }
}
      if(user){

        profile();
      }
},[user])
  return (
    <section>
      <NavBar/>
      <MDBContainer className="d-flex my-5 justify-content-center" style={{height: ''}}>
            <MDBCard>
              {profile && profile.map((element)=>(
              <MDBCardBody key = {element._id} className='d-flex flex-row'>
                <div className="d-flex flex-column me-5 justify-content-center">
                    <div className="d-flex flex-row">

                      {element.gender == "M"?
                        <MDBCardImage
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: '150px' }}
                        fluid />  
                        : 
                        <MDBCardImage
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4.webp" 
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: '150px' }}
                        fluid />  
                        }
                    </div>
                </div>
                <div className="d-flex flex-column mt-3">
                    <div className="d-flex flex-row">
                        <MDBCardText className='me-3'>Full Name:</MDBCardText>
                        <MDBCardText className="text-muted">{element.name}</MDBCardText>
                    </div>
                    <div className="d-flex flex-row">
                        <MDBCardText className='me-3'>Email:</MDBCardText>
                        <MDBCardText className="text-muted">{element.email}</MDBCardText>
                    </div>
                    
                    <div className="d-flex flex-row">
                        <MDBCardText className='me-3'>Gender:</MDBCardText>
                        <MDBCardText className="text-muted">{element.gender}</MDBCardText>
                    </div>
                    <div className="d-flex flex-row">
                        
                      <Button className='btn btn-warning'>Edit</Button>
                    </div>
                </div>
              </MDBCardBody>
))}
            </MDBCard>
            
      </MDBContainer>
    </section>
  );
}