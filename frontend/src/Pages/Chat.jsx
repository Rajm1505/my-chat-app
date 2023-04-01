  import { useState ,useEffect} from "react";
  import { ChatState } from "../Context/ChatProvider";
  import ScrollableFeed from 'react-scrollable-feed';
    import {
      MDBContainer,
      MDBRow,
      MDBCol,
      MDBCard,
      MDBCardHeader,
      MDBCardBody,
      MDBCardFooter,
      MDBIcon,
      MDBBtn,
      MDBInput,
      
    } from "mdb-react-ui-kit";
  import axios from "axios";
  import io from "socket.io-client"

  const ENDPOINT = "http://localhost:3100"
  var socket;


  const Chat = () =>{

      const [loggedUser , setloggedUser] = useState();

      const [allMessages , setAllMessages] = useState([]);
      const [loading, setLoading] = useState(false)
      const [newMessage, setNewMessage] = useState("");

      
      const urlArray = (window.location.href).split("/");
      const chatID = urlArray[urlArray.length-1]
      
      const {user} = ChatState()

      const [userName, setUserName] = useState("");
      const [userGender, setUserGender] = useState("M");
      const [socketConnected, setSocketConnected] = useState(false);

      // const {chats,setChats} = ChatState();


      useEffect(() => {
        socket = io(ENDPOINT)
        if(user){
          socket.emit("setup",user);
        }
        socket.on("connection",()=>{
          setSocketConnected(true);
          
        })
      }, [user])


      const sendMessage = async (event) =>{
          if(event.key === "Enter" && newMessage) {
              console.log("clicked")
              try{
                  const config = {
                      headers : {
                          "Content-Type" : "application/json",
                          Authorization : `Bearer ${user.token}`
                      }
                  };
                  setNewMessage("");
                  const {data} = await axios.post("http://127.0.0.1:3100/message/sendmessage",
                  {
                      body:newMessage,
                      chatID : chatID
                  },
                  config
                  );
                  setAllMessages([...allMessages,data])
                  console.log(data);
                  socket.emit("send message",data);
              }
              catch(error){
                console.log(error)
                
              }
            }
          }

          useEffect(() => {
            const fetchMessages = async () => {
              try {
                  setUserName(user.name);
                  const config = {
                      headers : {
                          Authorization : `Bearer ${user.token}`
                      }
                  };
                  setLoading(true);
                  const {data} = await axios.get("http://127.0.0.1:3100/message/allmessages/"+chatID,config);
                  console.log(data)
                  setAllMessages(data);
                  setLoading(false);
                  socket.emit("join chat", chatID)
              } catch (error) {
                  console.log(error)
              }
          }
          if(user){
            fetchMessages();
          }
            
          }, [user]);
    
          useEffect(() => {
          socket.on("message recieved",(newMessage) => {
            if(chatID != newMessage.chat._id){
              return
            }
            else{
              setAllMessages([...allMessages,newMessage])
            }
          }) ;
          
          })
          

          
          


      const typingHandler = (e) =>{
          console.log(e.target.value)
          setNewMessage(e.target.value);
      };

      const fetchChats = async () => {

      }

      const isSameSender = (allMessages, m, i, userID) => {  
        console.log(i < allMessages.length - 1 &&
          (allMessages[i + 1].sender._id !== m.sender._id ||
            allMessages[i + 1].sender._id === undefined) &&
            allMessages[i].sender._id !== userID)
        return (
          i < allMessages.length - 1 &&
          (allMessages[i + 1].sender._id !== m.sender._id ||
            allMessages[i + 1].sender._id === undefined) &&
            allMessages[i].sender._id !== userID
        );
      };

      const isLastMessage = (allMessages, i, userID) => {
        console.log(i === allMessages.length - 1 &&
          allMessages[allMessages.length - 1].sender._id !== userID &&
          allMessages[allMessages.length - 1].sender._id);
        return (
          i === allMessages.length - 1 &&
          allMessages[allMessages.length - 1].sender._id !== userID &&
          allMessages[allMessages.length - 1].sender._id
        );
      };

      const isSameSenderMargin = (messages, m, i, userId) => {
        // console.log(i === messages.length - 1);
      
        if (
          i < messages.length - 1 &&
          messages[i + 1].sender._id === m.sender._id &&
          messages[i].sender._id !== userId
        )
          return 5;
        else if (
          (i < messages.length - 1 &&
            messages[i + 1].sender._id !== m.sender._id &&
            messages[i].sender._id !== userId) ||
          (i === messages.length - 1 && messages[i].sender._id !== userId)
        )
          return 5;
        else return "auto";
      };
      
      const isSameUser = (messages, m, i) => {
        return i > 0 && messages[i - 1].sender._id === m.sender._id;
      };
      
      const getSender = (loggedUser, users) => {
        return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
      };
      
      const getSenderFull = (loggedUser, users) => {
        return users[0]._id === loggedUser._id ? users[1] : users[0];
      };

      const getTimeStamp = (m) => {
        return ((m.createdAt).split("T")[1]).slice(0,5)
      }
      
    
      return(
          <>
          <MDBContainer fluid className="" style={{ backgroundColor: "#000",height:"100vh" }}>
        <MDBRow className="d-flex justify-content-center" style={{ backgroundColor: "#000" }}>
          <MDBCol md="10" lg="8" xl="6">
            <MDBCard id="chat2" style={{ borderRadius: "15px", background:"000" }}>
              <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
                <div style={{display: "flex", alignItems: "center"}}>
                  {/* User Default Avatar based on gender */}
                  {
                    userGender ? 
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                        alt="avatar 1"
                        style={{ width: "45px", height: "100%" }}
                    />
                        :
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                        alt="avatar 1"
                        style={{ width: "45px", height: "100%" }}
                      />    
                  }
                <h5 className="mb-0 ms-2 text-white">{userName}</h5>
                </div>
                <MDBBtn color="primary" size="sm" rippleColor="dark">
                  Let's Chat App
                </MDBBtn>
              </MDBCardHeader>
              
                <MDBCardBody>

          <div style={{height:"500px",overflowY:"scroll"}}>
              {allMessages && allMessages.map((m,i)=>(
                  <div style={{display : "flex"}} key={m._id}>
                    {/* {
                      (
                        isSameSender(allMessages,m,i,user._id)
                        || isLastMessage(allMessages,i,user._id)
                        ) && (
                          <p style={{display : "block"}}><img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                          alt="avatar 1"
                          style={{ width: "45px", height: "100%" }}
                        /></p>
                        )
                    } */}
                    

                    <span className=  {`${m.sender._id === user._id ? "bg-primary text-white" : "bg-secondary text-dark " }`}
                    style={{
                      color : "B9F5D0", 
                      borderRadius: "20px", 
                      padding : "5px 15px", 
                      maxWidth : "75%",
                      marginLeft : isSameSenderMargin(allMessages,m,i,user._id),
                      marginTop: isSameUser(allMessages,m,i,user._id)? 5 : 10  }}>
                      
                      <span className="h-100 me-3 ">
                      {m.body}
                      </span>

                      <span className="mt-3" style={{fontSize : "9px",float:"right"}}>
                        {getTimeStamp(m)}
                      </span>

                    </span>
                  </div>
              ))}
          </div>

                  {/* <div className="d-flex flex-row justify-content-start">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                      alt="avatar 1"
                      style={{ width: "45px", height: "100%" }}
                    />
                    <div>
                      <p
                        className="small p-2 ms-3 mb-1 rounded-3"
                        style={{ backgroundColor: "#f5f6f7" }}
                      >
                        Hi
                      </p>
                      <p
                        className="small p-2 ms-3 mb-1 rounded-3"
                        style={{ backgroundColor: "#f5f6f7" }}
                      >
                        How are you ...???
                      </p>
                    </div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                      alt="avatar 1"
                      style={{ width: "45px", height: "100%" }}
                    />
                  </div>

                  <div className="d-flex flex-row justify-content-start mb-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                      alt="avatar 1"
                      style={{ width: "45px", height: "100%" }}
                    />
                    <div>
                      <p
                        className="small p-2 ms-3 mb-1 rounded-3"
                        style={{ backgroundColor: "#f5f6f7" }}
                      >
                        Okay
                      </p>
                      <p
                        className="small p-2 ms-3 mb-1 rounded-3"
                        style={{ backgroundColor: "#f5f6f7" }}
                      >
                        We will go on Sunday?
                      </p>
                      <p className="small ms-3 mb-3 rounded-3 text-muted">
                        00:07
                      </p>
                    </div>
                  </div>

                  <div className="d-flex flex-row justify-content-end mb-4">
                    <div>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                        That's awesome!
                      </p>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                        I will meet you Sandon Square sharp at 10 AM
                      </p>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                        Is that okay?
                      </p>
                      <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                        00:09
                      </p>
                    </div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                      alt="avatar 1"
                      style={{ width: "45px", height: "100%" }}
                    />
                  </div> */}


                </MDBCardBody>
              <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                  alt="avatar 3"
                  style={{ width: "45px", height: "100%" }}
                />
          
                <input
                  type="text"
                  onChange={typingHandler}
                  onKeyDown={sendMessage}
                  value={newMessage}
                  
                  className="form-control form-control-lg ms-3"
                  id="exampleFormControlInput1"
                  placeholder="Type message"
                ></input>
                
                <MDBBtn onClick={sendMessage} className="ms-3 px-3">
                  <MDBIcon fas icon="paper-plane" />
                </MDBBtn>
              </MDBCardFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
          </>


      );

  };

  export default Chat;