const asyncHandler = require('express-async-handler');
const user =require('../models/userModel');
const bcrypt = require('bcrypt');
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
    res.json({message:'Logeed in the user   '
    });
});
//@des current user
//@route POST /api/users/current
//@access Public

const currentUser = asyncHandler(async(req,res)=>{
    res.json({message:'current user information   '
    });
});

module.exports={registerUser,loginUser,currentUser};