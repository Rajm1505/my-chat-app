const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    
    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    body: {
        type: String,
        required: true,
    },
    chat:{
        type: Schema.Types.ObjectId,
        ref:'Chat',
    },   
},{timestamps:true});
  

const Message = new mongoose.model('Message',messageSchema);
module.exports = Message;