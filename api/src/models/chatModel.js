var mongoose = require('mongoose');

const Schema = mongoose.Schema;


var chatSchema = new mongoose.Schema({
    
    users: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
      }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    }},
  { timestamps: true });

const Chat = new mongoose.model('Chat',chatSchema);
module.exports = Chat;