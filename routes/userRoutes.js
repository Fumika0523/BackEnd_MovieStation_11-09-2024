const User = require('../model/userModel')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const sendWelcomeEmail = require('../emails/sendWelcomeEmail')
const {auth} = require('../middleware/auth')

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
    // console.log(user)
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
    res.send({userData,message:"Successfully logged in!"})
    // console.log({userData,message:"Successfully logged in!"})
    if(userData){
    sendWelcomeEmail(req.body.email,req.body.name)
    }else{
        res.send(
        {message:"Please check again"})
    }
    }catch(e){
    res.send("Some Internal Error Occurred")
}
})

// Signin
router.post('/signin', async(req,res)=>{
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

// Get Routes
//userdetail 
router.get('/user',auth,async(req,res)=>{
     try{
     if(req.user){
        res.send({"userDetail":req.user})
     }
     else{
        res.send({message:"User Not Found"})       
     }
    }
    catch(e){
        res.send({"Message":"Some Internal Error"})
    }
})

//get single user
router.get('/profile',auth,async(req,res)=>{
    try{
    // console.log(req.token)
    // console.log(req.user)
    const getProfile = await User.findById(req.user._id)
    if(!getProfile){
        res.send({
            message:"The user profile cannot be found!"
        })
    }
    res.send({ProfileData:getProfile})
    }catch(e){
    res.send({message:"Some Internal Error"})
}
})


//update profile
router.put('/profile/:id',auth,async(req,res)=>{
    // try{
        console.log("Update Profile",req.user._id)
        if(req.user){
            const updateUser = await User.findOneAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
            if(!updateUser){
                res.send({message:"User Not Found"})
            }
        }res.send("updateUser",updateUser)            
    // }catch(e){
    //     res.send({message:"Some Internal Error"})
    // }
})


module.exports=router