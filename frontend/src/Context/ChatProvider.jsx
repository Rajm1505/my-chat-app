import { useContext, createContext, useState, useEffect, useLoca } from 'react';
import { useNavigate } from 'react-router-dom';


const ChatContext = createContext()

const ChatProvider = ({children}) => {

    const [user, setUser] = useState();
    const navigate = useNavigate();


    useEffect(() => {
        const USER = JSON.parse(localStorage.getItem("USER"));
        const unprotectedRoutes = ['/', '/register','/contactus','/contactus']; // add the routes you don't want to protect here
        const currentRoute = window.location.pathname;
        if(!USER && !unprotectedRoutes.includes(currentRoute)){

            navigate("/login")
        }
        setUser(USER);
        

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
