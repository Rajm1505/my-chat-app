import React from 'react';
import axios from 'axios';
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';


function Register(e){

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const postdata = (e) =>{
        let data = JSON.stringify(e);
        console.log(data);
        axios
        .post("http://127.0.0.1:3100/",data).then(()=>{
            console.log("Registered");
            navigate('login');
        }).catch((err)=>{
            console.log(err);
        });
    }
    
    return(
        <Form onSubmit = {handleSubmit(postdata)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" {...register("name")} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter your email " {...register("email")}/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" {...register("password")} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        
      </Form>
    );




}
export default Register;

