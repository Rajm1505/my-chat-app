  import { useState ,useEffect} from "react";
  import { ChatState } from "../Context/ChatProvider";
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
  import { useNavigate } from "react-router-dom";


  const ENDPOINT = "http://localhost:3100"
  var socket;


  const Chat = () =>{

      const navigate = useNavigate();
      const [allMessages , setAllMessages] = useState([]);
      const [loading, setLoading] = useState(false)
      const [newMessage, setNewMessage] = useState("");

      
      const urlArray = (window.location.href).split("/");
      const chatID = urlArray[urlArray.length-1]
      const friendname = urlArray[urlArray.length-2]
      
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
            setUserGender(user.gender)
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
      
      const getTimeStamp = (m) => {
        return ((m.createdAt).split("T")[1]).slice(0,5)
      }
      
      function handleBack(event){
        navigate("/friendlist")
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
                <h5 className="mb-0 ms-2 text-white">{friendname}</h5>
                </div>
                <MDBBtn color="primary" onClick={handleBack} size="sm" rippleColor="dark">
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </MDBBtn>
              </MDBCardHeader>
              
                <MDBCardBody>

          <div style={{height:"500px",overflowY:"scroll"}}>
              {allMessages && allMessages.map((m,i)=>(
                  <div style={{display : "flex"}} key={m._id}>
                  
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

                </MDBCardBody>
              <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                {
                    userGender == "M" ? 
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