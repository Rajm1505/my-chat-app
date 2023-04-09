import '../css/addnewfriend.css';
import React, { useEffect, useState } from 'react';
import Navbar1 from '../Navbar1';
import axios from 'axios';
import { ChatState } from '../Context/ChatProvider';

export default function Search(){
    const [users,setUsers] = useState([])
    const {user} = ChatState();

    useEffect(()=>{
        const searchUsers = async()=>{
            try{
                const urlarray = (window.location.href).split("/")
                const name = urlarray[urlarray.length-1]
            
                const {data} = await axios.get("http://localhost:3100/user/search/"+name)
                console.log(data);
                setUsers(data);
        }catch(error){
            console.log(error);
        }
    }
          
       searchUsers();
    },[])

    const addfriend = async(_id)=>{
        try{
        const config = {
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${user.token}`
            }
        };
        
            const {data} = await axios.post("http://127.0.0.1:3100/chat/addfriend",
        {
            userId:_id
        },
        config
        );
        console.log(data);
    }catch(error){
        console.log(error);
    }
}
    

    
    return(
        <>
            <Navbar1 />

            <div className="container">
                <div className="row d-flex justify-content-center mt-5">
                    <div className="col-md-8">
                        <div className="people-nearby text-white">




                            {users && users.map((element)=>(
                                 <div className="nearby-user">
                                 <div className="row d-flex align-items-center">
                                     <div className="col-md-2 col-sm-2">
                                        {element.gender=="M"?
                                         <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp" alt="user" className="profile-photo-lg" />
                                         :
                                         <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp" alt="user" className="profile-photo-lg" />
                                        }
                                     </div>
                                     <div className="col-md-7 col-sm-7">
                                         <h5>{element.name}</h5>
                                     </div>
                                     <div className="col-md-3 col-sm-3">
                                         <button className="btn btn-outline-primary pull-right" onClick={()=>{addfriend(element._id)}} >Add Friend</button>
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