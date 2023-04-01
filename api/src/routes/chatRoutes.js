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

// router.use(function(req, res, next) {
//     try {
//         jwtUser = jwt.verify(getTokenInput(req), process.env.SECRET_KEY);
//         next();
//     } catch (err) {
//         console.log(err);
//         res.setHeader('Content-Type', 'application/json');
//         res.status(401).send(JSON.stringify({ message: 'Unauthorized' }))
//        }
// });

//Creating a chat document in database to create friend
//One chat should have two ids
//Get current user's id from "jwtUser.id"
router.post("/addfriend",async (req, res) => {
  const { userId,userId2 } = req.body;//const { userId } = req.body;
  // console.log(jwtUser.id)
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  //Check if already friend is created in DB
  var isChat = await Chat.find({
    $and: [
      { users: { $elemMatch: { $eq: userId2 } } }, //use jwtUser.id 
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      users: [userId,userId2],//use jwtUser.id
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
})



// List all the friends of loggedin user
// router.get('/allfriends')
// in routes/chatRoutes.js





// router.post('/removefriend') //Remove the friend from the loggedin user 
              
module.exports = router;