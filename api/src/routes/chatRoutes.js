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
        return res.status(401).send(JSON.stringify({ message: 'Unauthorized' }))
       }
});

//Creating a chat document in database to create friend
//One chat should have two ids
//Get current user's id from "jwtUser.id"
router.post("/addfriend",async (req, res) => {
  const { userId } = req.body;//const { userId } = req.body;
  // console.log(jwtUser.id)
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  //Check if already friend is created in DB
  var isChat = await Chat.find({
    $and: [
      { users: { $elemMatch: { $eq:  jwtUser.id } } }, //use jwtUser.id 
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
    return res.send(isChat[0]);
  } else {
    var chatData = {
      users: [userId,jwtUser.id],//use jwtUser.id
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      return res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
})



// List all the friends of loggedin user
router.get('/allfriends',async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: jwtUser.id } } })
      .populate({path:"users", select : "-password",    match: { _id: { $ne: jwtUser.id } }})
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        // results = await User.populate(results, {
        //   path: "latestMessage.sender",
        //   select: "name email",
        // });
        console.log(results);
        if(results.length == 0){
          return res.status(404)
          .send({"message":"No Friends found"});
        }
        return res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
})




//Remove the friend from the loggedin user 
router.post('/removefriend',async(req,res)=>{         
  try{
    console.log(jwtUser.id);
    const {friendID} = req.body;
    console.log(friendID);
    const chat = await Chat.findOne({
      $and: [
        { users: { $elemMatch: { $eq:  jwtUser.id} } }, //jwtUser.id
        { users: { $elemMatch: { $eq: friendID } } }
      ],
    })
    console.log("chat in removefriend: ",chat);
    if(!chat){
      console.log("Friend not found");
      return res.sendStatus(204);
    }
    console.log("chat: ",chat);
    console.log("chatid: ",chat._id);

    try{
      await Chat.deleteOne({_id : chat._id});
      await Message.deleteMany({chat:chat._id});
      return res.sendStatus(204)

    }
    catch(error){
      console.log(error);
      return res.status(500).send({message:"Could not remove friend"})
    }
  
  }catch(error){
    console.log(error);
  }
  })
              
module.exports = router;