const asyncHandler=require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken =asyncHandler(async(req,res,next)=>{
    // res.json("ran validateToken");

    let token;
    let authheader=req.headers.Authorization || req.headers.authorization;
    if(authheader && authheader.startsWith('Bearer')){
        // console.log('token found');
        token = authheader.split(' ')[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401);
                res.json('Not authorized, token failed');
            }
        console.log(decoded);
        req.user = decoded.user;
        next();
        })
        if(!token){
            res.status(401);
            res.json('Not authorized, token failed');
        }
        // res.json(req.user);
    }
});
module.exports=validateToken;
    
    