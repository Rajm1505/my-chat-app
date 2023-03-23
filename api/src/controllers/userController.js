const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const USER = require('../models/userModel');

const uuidv4 = require('uuid/v4');
const multer = require('multer');
const DIR = './public/';

// get config vars
dotenv.config();

// access config variables
// console.log("secret",process.env.SECRET_KEY);

//Fileupload functions

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,DIR);
    },
    filename:(req,file,cb) => {
        const filename = file.originalname.toLowerCase().split(' ').join('-');
        cb(null,uuidv4() + '-' + filename)
    }
});

const allowedfiletypes = ['image/png','image/jpg','image/jpeg'];
var upload = multer({
    storage: storage,
    fileFilter: (req,file,cb) =>{
        if(allowedfiletypes.includes(file.mimetype)){
            cb(null,true);
        } else {
            cb(null,false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})

exports.upload = upload;


//Registration controller
exports.register = async (req,res,next)=>{
    // const url = req.protocol + '://' + req.get('host')
    
    
    //Checking if every required field is recieved or not
    if(!req.body.email && !req.body.firstname && !req.body.firstname && !req.body.phone && !req.body.password && !req.body.gender){
        res.status(400).send({"message":"All the fields are required!"});
    }
    //creating a model instance using the provided values
    const user = new userModel({
        name: req.body.name,
        email : req.body.email,
        password : req.body.password,
        phone: req.body.phone,
        gender: req.body.gender,
        // avatar : url + '/public/' + req.file.filename,
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
function generateJWTToken(email){
    return jwt.sign({"email":email},process.env.SECRET_KEY,{ expiresIn: '1h' });
}

exports.login = async(req,res,next)=>{

    let { email, password } = req.body;
    // Fetching a model instance with provided emailid
    try{
        var User = await USER.findOne({email});
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
            const token = generateJWTToken(email);
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
