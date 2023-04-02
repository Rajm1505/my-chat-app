import '../css/addnewfriend.css';
import React, { useEffect, useState } from 'react';
import Navbar1 from '../Navbar1';
import axios from 'axios';

export default function Search(){
    // const [name,setName] = useState("")
    const [users,setUsers] = useState([])

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
        // const config = {
        //     headers : {
        //         "Content-Type" : "application/json",
        //         Authorization : `Bearer ${user.token}`
        //     }
        // };
        // setNewMessage("");
        
            const {data} = await axios.post("http://127.0.0.1:3100/chat/addfriend",
        {
            userId:"642850b67eeb740522485b2b",
            userId2:_id
        },
        // config
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
                                         <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user" className="profile-photo-lg" />
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