const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const user = require('../models/userModel');

// get config vars
dotenv.config();

// access config variables
// console.log("secret",process.env.SECRET_KEY);

exports.register = async (req,res,next)=>{
    //Checking if every required field is sent or not
    if(!req.body.email && !req.body.firstname && !req.body.firstname && !req.body.phone && !req.body.password){
        res.status(400).send({"message":"All the fields are required!"});
    }
    //creating a model instance using the provided values
    const user = new userModel({
        email : req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        password : req.body.password
    });

    //Saving the instance to create the user
    await user.save().then(data=>{
        res.send({
            message:"User created successfully",
            user:data
        });
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user!"
            
        });
    });
};

//Generating JWT token
function generateAccessToken(email){
    return jwt.sign({"email":email},process.env.SECRET_KEY,{ expiresIn: '1h' });
}

exports.login = async(req,res,next)=>{

    let { email, password } = req.body;
    // Fetching a model instance with provided emailid
    try{
        var User = await user.findOne({email});
    }catch{
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }
    //Validating user
    if(User)
    {   
        if(!password || password != User.password){
            res.status(404).send({"message":"Email or Password is invalid!"})
        }
        else{
            //Sending the token as response so that react can set it as a cookie
            const token = generateAccessToken(email);
            console.log(true);
            res.status(200).send({"token":token})
            
        }
    }
    else{
        //If the user instance has empty {}
        res.status(404).send({"message":"Account does not exist!"})
    }

};

// Note: Logout will be done using react by simply deleting the jwt cookie
