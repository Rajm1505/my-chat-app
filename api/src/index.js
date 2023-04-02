const express  = require('express')
const cors = require('cors');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
require('./db/dbconnection')

const app = express()

dotenv.config()
const PORT = process.env.PORT
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
// All the routes will be used after / eg: localhost:Port/<routes>
app.use('/user',userRoutes)
app.use('/chat', chatRoutes);
app.use('/message', messageRoutes);
app.use('/public', express.static('public'));

app.use((req, res, next) => {
    //allow access from every, elminate CORS
    res.setHeader('Access-Control-Allow-Origin','*');
    res.removeHeader('x-powered-by');
    //set the allowed HTTP methods to be requested
    res.setHeader('Access-Control-Allow-Methods','POST');
    //headers clients can use in their requests
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    //allow request to continue and be handled by routes
    next();
});


const server = app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`)
});

const io = require("socket.io")(
    server,
    {
        pingTimeout: 60000,
        cors:{
        origin:"*"
    },
}
)

io.on("connection",(socket)=>{
    console.log("Socket Connected");

    socket.on("setup", (userData) => {

        socket.join(userData._id);
        console.log(userData._id); 
        socket.emit("connected");
    })

    socket.on("join chat", (chat) => {
        socket.join(chat)
        console.log("User joined " + chat);
    })

    socket.on("send message",(newMessage)=>{
        var chat = newMessage.chat;
        if(!chat.users){
            return console.log("chat.user not defined");
        }
        chat.users.forEach(user => {
            if(user._id == newMessage.sender._id) return;

            socket.in(user._id).emit("message recieved",newMessage )
        });
    })
})

module.exports = app;