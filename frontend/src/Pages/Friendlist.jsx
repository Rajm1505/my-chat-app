import React, { useState, useEffect } from 'react';
import NavBar from '../Navbar1';
import axios from 'axios';
import { ChatState } from '../Context/ChatProvider';
import { useNavigate } from 'react-router-dom';

export default function Friendlist(){

    const [friends,setFriends] = useState([])
    const {user} = ChatState()
    const navigate = useNavigate();

    useEffect(()=>{
        const friendList = async()=>{
            try{

                const config = {
                    headers : {
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${user.token}`
                    }
                }
                console.log(user.token);

                const {data} = await axios.get("http://localhost:3100/chat/allfriends",config)
                console.log(data);
                setFriends(data);
        }catch(error){
            console.log(error.data);
        }
    }
     if(user){
        friendList();
    }     

    },[user])

    const chatWith = async(chatID,name) => {
        navigate(`/chat/${name}/${chatID}`)
    }

    const removeFriend = async(_id)=>{
         
        const config = {
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${user.token}`
            }
        };        
        await axios.post("http://127.0.0.1:3100/chat/removefriend",{friendID:_id},config)
        .then(function(response){
            console.log(response);
        }).catch(function(error){
            console.log(error);
        });
    }


    return(
        <>
            <NavBar />

            <div className="container">
                <div className="row d-flex justify-content-center mt-5">
                    <div className="col-md-8">
                        <div className="people-nearby text-white">
                            
                        {friends && friends.map((element,i)=>(
                            <div className="nearby-user" key={element._id}>
                                <div className="row d-flex align-items-center">
                                    <div className="col-md-2 col-sm-2">
                                        <img src={`${element.users[0].gender === "M" ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp" : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"}`} alt="user" className="profile-photo-lg" />
                                    </div>
                                    <div className="col-md-7 col-sm-7">
                                        <h5 className='text-white'>{element.users[0].name}</h5>
                                    </div>
                                    <div className="col-md-3 col-sm-3 d-flex">
                                        <button className="btn btn-outline-warning pull-right me-3" onClick={()=>{chatWith(element._id,element.users[0].name)}} >Chat</button>
                                        <button className="btn btn-outline-danger pull-right" 
                                        onClick={()=>{removeFriend(element.users[0]._id)}}>
                                            Remove
                                        </button>                                  
                                    </div>
                                </div>
                            </div>
                        ))}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}