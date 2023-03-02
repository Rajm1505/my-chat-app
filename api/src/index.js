const express  = require('express')
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()

const userRouter = require('./routes/usersRoutes');
require('./db/dbconnection')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));

// All the routes will be used after / eg: localhost:Port/<routes>
app.use('/',userRouter)
app.use('/public', express.static('public'));


const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`)
});

module.exports = app;