const asyncHandler = require('express-async-handler');
const user =require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//@des register user
//@route GET /api/users/register
//@access Public

const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        return res.json('Please enter all fields');
    }
    const userAvailable = await user.findOne({email});
    if(userAvailable){
        res.status(400);
        return res.json('User already exists');
    }
    //hashing the password
    const hashPassword = await bcrypt.hash(password,10);
    console.log(hashPassword);
    const User = await user.create({
        username,
        email,
        password:hashPassword,
    });
    // console.log(User);
    if (User){
        res.status(201).json({_id:User.id,email:User.email});
    }
    else{
        res.status(400);
        return res.json('Invalid user data');
    }

        
    res.json({message:'Registered the user'
    });
});
//@des login user
//@route GET /api/users/login
//@access Public

const loginUser = asyncHandler(async(req,res)=>{
    // console.log("inside login");
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        return res.json('Please enter all fields');
    }
    const User=await user.findOne({email});
    // console.log("out1");
    if(user && (await bcrypt.compare(password,User.password))){
        // console.log("inside if");
        const accesstoken =jwt.sign({
         user:{
            username:user.username,
            email:user.email,
            id:user._id,
         },
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:'1d'
        });

    res.status(200).json({accesstoken});
    res.json({message:'Logeed in the user   '
    });
}
    // console.log("out2");
    else{
        res.status(400);
        return res.json('Invalid user data');
    }
});
//@des current user
//@route POST /api/users/current
//@access private

const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user);
});

module.exports={registerUser,loginUser,currentUser};