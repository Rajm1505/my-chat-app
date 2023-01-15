var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    firstname:{
        type:String,
        default:''
    },
    lastname:{
        type:String,
        default:''

    },
    password:{
        type:String,
        required:true
    },
    phone:String,
});

var user = new mongoose.model('User',schema);
module.exports = user;