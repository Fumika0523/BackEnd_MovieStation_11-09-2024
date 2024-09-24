const express=require('express')
const router=express.Router()
const Enquiry = require('../model/enquiryModel')
const auth = require('../middleware/auth')

// Submit Enquiry
router.post('/contact',auth,async(req,res)=>{
    try{
    const enquiryDetail = new Enquiry ({
        ...req.body, /// making the copy of req.body
        owner:req.user._id // Who contacted
    })
    if(!enquiryDetail){res.status(401).send({message:"Unable to make a inquery."})}
    await enquiryDetail.save()
    res.status(200).send({
        enquiryDetail:enquiryDetail,message:"Your inquery has successfully been sent!"
    })
}catch(e){
    res.status(500).send({message:"Some Internal Error"})
}
})

// Get All Enquiry Data
router.get('/allenquiry',auth,async(req,res)=>{
     try{
        console.log(req.user._id);
        if(req.user){
            const getAllEnquiry = await req.user.populate("enquiryRel")
            console.log("test",getAllEnquiry)

        if(getAllEnquiry){
            res.send({"enquiryData":req.user.enquiryRel})
        }else{
            res.send({"message":"Enquiry is not added"})
        }
        }else{
            res.send({"message":"User not Found, signin is failed!"})
        }
    }catch(e){
        res.send({"message":"Some Internal Error"})
    }
})

module.exports= router