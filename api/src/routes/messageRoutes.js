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


router.post("/sendmessage", async(req,res) => {
    console.log(jwtUser.id);
    const { body,chatID } = req.body;

    if(!body || !chatID){
        console.log("Invalid Data passed");
        return res.sendStatus("400");
    }

    var newMessage = {
        sender: jwtUser.id,
        body : body,
        chat: chatID
    }

    try{
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name email",
        });

        await Chat.findByIdAndUpdate(chatID,{
            latestMessage : message,
        }) 

        return res.json(message)

    } catch(error){
        res.status(400);
        throw new Error(error.message);
    }

});

router.get("/allmessages/:chatID", async(req,res) =>{
    try{
        const messages = await Message.find({chat:req.params.chatID})
        .populate("sender","name email")
        .populate("chat");

        return res.json(messages)
    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }
})

module.exports = router;