const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const auth = async(req,res,next)=>{
    console.log("Auth middleware is called")
    console.log("text",req.header('Authorization'))
try{
    if(!req.header('Authorization')){
        return res.send({message:"Authorization Header is Missing"})
     }
     const token = req.header('Authorization').replace("Bearer ","")
     const decode = jwt.verify(token,"nodejs")
     req.token = token
     const user = await User.findOne({_id:decode._id})
     req.user = user
     if(!user){
        res.send({user, 
            message:"User Not Found"})
     }
     next()
}catch(e){
    res.send({message:"Authentication Error"})
}

}

const conditionalAuth = (req,res,next)=>{
    if(req.header('Authorization')){
        // if Authorazation is there,call auth
        return auth(req,res,next)
    }else{
        // if missing pls go to next
        return next()
    }
    
}

module.exports = {auth, conditionalAuth}