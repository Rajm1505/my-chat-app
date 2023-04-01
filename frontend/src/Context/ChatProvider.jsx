import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ChatContext = createContext()

const ChatProvider = ({children}) => {

    const [user, setUser] = useState();
    const [chats, setChats] = useState();
    const navigate = useNavigate();


    useEffect(() => {
        const USER = JSON.parse(localStorage.getItem("USER"));
        setUser(USER);
        
        if(!USER){
            navigate("/login")
        }

    }, [])
    

    return (
        <ChatContext.Provider value={{user,setUser}}>
            {children}
        </ChatContext.Provider>
    )
}
export const ChatState = () =>{
    return useContext(ChatContext);
}


export default ChatProvider;
