const User = require('../model/userModel')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')
const sendWelcomeEmail = require('../emails/sendWelcomeEmail')

//POST REQUEST
router.post('/signup',async(req,res)=>{
    try{
    //checking if the user is already registered
    let user = await User.findOne({
              $or:[
            {email:req.body.email},
            {phone_number:req.body.phone_number}
        ]
    })
    console.log(user)
    if(user){console.log("User is found", req.body.email)
        return res.send("User Already Exists")
    }
    //password hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)
    const userData = new User({
        ...req.body, //making the copy of req.body
        password:hashedPassword // this one I need to update
    })
    await userData.save()
    res.send(userData)
    if(userData){
    sendWelcomeEmail(req.body.email,req.body.name)
    }else{
        res.send(
        {message:"Please check again"}
        )
    }
    }catch(e){
    res.send("Some Internal Error Occurred")
}
})

// Signin
router.post('/signin',async(req,res)=>{
// res.send(req.body)
try{
    // Checking Email address
    let user = await User.findOne({
        //checking by user detail with email
        email:req.body.email,
    })
    console.log(user)
    // console.log(req.body.password)
     if(!user){return res.status(400).send({message:"User Email Address Not Found"})}
    
     // Checking by user with Password
   const isMatch = await bcrypt.compare(req.body.password,user.password)//from postman, from the email
    if(!isMatch){return res.status(400).send({message:"User Password is incorrect"})}

    //if user and match both  validation are suvccessful then generate the token

      if(isMatch && user){
        const token = await user.generateAuthToken()

        return res.status(200).send({
            message:"You have successfully Sign In!",
            user:user,
            token:token,
        })
    }
    // If all conditions failed it will come to this
    res.status(401).send({
        message:"Your login credentials are incorrect, kindly check and re-enter!"
    })
}catch(e){
    res.status(500).send({message:"Some Internal Error"})
}
})

//create a movie with auth

module.exports=router