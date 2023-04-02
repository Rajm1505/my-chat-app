var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        default:''
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:false
    }
});

const user = new mongoose.model('User',schema);
module.exports = user;