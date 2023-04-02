const router = require('express').Router();
const multer = require('multer');
const USER = require('../models/userModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();

function generateJWTToken(id){
    return jwt.sign({"id":id},process.env.SECRET_KEY,{ expiresIn: '1h' });
}



// let jwtUser = null;

const getTokenInput = req => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    )
        return req.headers.authorization.split(' ')[1];
    return null;
};

function verifyJWT(req, res, next) {
    try {
         return jwt.verify(getTokenInput(req), process.env.SECRET_KEY);
        next();
    } catch (err) {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        return res.status(401).send(JSON.stringify({ message: 'Unauthorized' }))
       }
};

// const storage = multer.diskStorage({
//     destination: (req,file,cb) => {
//         cb(null,"public/");
//     },
//     filename:(req,file,cb) => {
//         const filename = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null,uuidv4() + '-' + filename)
//     }
// });

// const allowedfiletypes = ['image/png','image/jpg','image/jpeg'];
// var upload = multer({
//     storage: storage,
//     fileFilter: (req,file,cb) =>{
//         if(allowedfiletypes.includes(file.mimetype)){
//             cb(null,true);
//         } else {
//             cb(null,false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// }).single('image')







// Route for creating the user
router.post('/register', async (req,res,next)=>{
    // const url = req.protocol + '://' + req.get('host')
    //Checking if every required field is recieved or not

    if(!req.body.email && !req.body.name && !req.body.password && !req.body.gender){
        res.status(400).send({"message":"All the fields are required!"});
    }
    //creating a model instance using the provided values
    const user = new USER({
        name: req.body.name,
        email : req.body.email,
        password : req.body.password,
        gender: req.body.gender,
        // avatar : url+'./Uploads/' + req.body.image,
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
})

// Route for login 
router.post('/login',async(req,res,next)=>{

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
            const token = generateJWTToken(User._id);
            var data = {
                "name":User.name,
                "_id":User._id,
                "token":token,
                "gender":User.gender
            }
            console.log(true);
            res.status(200).send(data)
            
        }
    }
    else{
        //If the user instance has empty {}
        res.status(404).send({"message":"Account does not exist!"})
    }

});

// Note: Logout will be done using react by simply removing jwt from localstorage


//Search in database against the query recieved
// router.post('search') 
router.get('/search/:name', async (req,res) => {
    try {
        const name = req.params.name;
        const user = await USER.find({name:{ $regex:'.*'+name+'.*'} });
        res.send(user);
    } catch (error) {
        res.status(404).send({message: error});        
    }
})

//view profile
router.get("/profile",async(req,res,next)=>{
    try {
        const jwtUser = verifyJWT(req,res,next);
        // const name = req.params.name;
        const user = await USER.find({_id:jwtUser.id}).select('-password')
        return res.send(user);
    } catch (error) {
        res.status(404).send({message: "cannot find user"});        
    }
})


module.exports = router;