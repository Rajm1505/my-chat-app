const express  = require('express')
const cors = require('cors');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const io = require('socket.io');;

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
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

    module.exports = app;