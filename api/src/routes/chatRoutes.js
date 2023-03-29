const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const router = express.Router();
const dotenv = require('dotenv');


const Message = require('../models/messageModel');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');

let jwtUser = null;

const getTokenInput = req => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    )
        return req.headers.authorization.split(' ')[1];
    return null;
};

router.use(function(req, res, next) {
    try {
        jwtUser = jwt.verify(getTokenInput(req), process.env.SECRET_KEY);
        next();
    } catch (err) {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.status(401).send(JSON.stringify({ message: 'Unauthorized' }))
       }
});

//Creating a chat document in database to create friend
//One chat should have two ids
//Get current user's id from "jwtUser.id"
router.post("/addfriend")



// List all the friends of loggedin user
router.get('/allfriends')


// router.post('/removefriend') //Remove the friend from the loggedin user 

module.exports = router;