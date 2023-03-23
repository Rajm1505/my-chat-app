const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const USER = require('../models/userModel');

const uuidv4 = require('uuid/v4');
const multer = require('multer');
const DIR = './public/';

// get config vars
dotenv.config();

exports.search = async (req,res,next)=>{


    var query = req.params.q;
    try{
        var users = await USER.find({query});
    }catch{
        const error = new Error("Something went wrong on our side!")
        return next(error);
    }
    if(users){
        console.log(users)
    }
};
