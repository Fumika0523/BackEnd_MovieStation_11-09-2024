const express=require('express')
const router=express.Router()
const Enquiry = require('../model/enquiryModel')
const {auth,conditionalAuth} = require('../middleware/auth')


// Submit Enquiry
// router.post('/contact', conditionalAuth, async (req, res) => {
//   try {
//     const isRegistered = req?.user?._id ? true : false;
//     if(req?.user?._id) {
//      let  enquiryData = {
//       ...req.body,
//       ...(isRegistered && { owner: req.user._id })
//        };
//     const enquiryDetail = new Enquiry(enquiryData);
//     const savedEnquiry = await enquiryDetail.save();
       
//   }   
//     else{
//      let  enquiryData = req.body
//       const enquiryDetail = new Enquiry(enquiryData);
//     const savedEnquiry = await enquiryDetail.save();
//     res.status(200).send({
//       enquiryDetail: savedEnquiry,
//       message: "Your enquiry has successfully been sent!"
//     });
//          };
        
//   } catch (e) {
//     console.error("Error while saving enquiry:", e);
//     res.status(500).send({ message: "Some internal error occurred." });
//   }
// });
router.post('/contact', conditionalAuth, async (req, res) => {
  try {
    const isRegistered = Boolean(req?.user?._id);

    const enquiryData = {
      ...req.body,
      ...(isRegistered && { owner: req.user._id })
    };

    const enquiryDetail = new Enquiry(enquiryData);
    const savedEnquiry = await enquiryDetail.save();

    res.status(200).send({
      enquiryDetail: savedEnquiry,
      message: "Your enquiry has successfully been sent!"
    });
    
  } catch (e) {
    console.error("Error while saving enquiry:", e);
    res.status(500).send({ message: "Some internal error occurred." });
  }
});



// Get All Enquiry Data
     router.get('/allenquiry', async (req, res) => {
  try {
    const allEnquiries = await Enquiry.find();
    res.status(200).json({ allEnquiry: allEnquiries });
  } catch (error) {
     console.error("Error fetching enquiries:", error);
    res.send({"message":"Some Internal Error"})
  }
});

    //Get specific Enquiry Data
    router.get('/specific-enquiry',auth,async(req,res)=>{
         try{
        console.log("specific Enquiry",req.user._id)
        if(req.user){
          let getAddedEnquiry = await req.user.populate("enquiryRel")
          console.log("specificEnquiryData",getAddedEnquiry) 
          if(getAddedEnquiry){
                res.send({"getEnquiry":req.user.enquiryRel})
          }else{
              return  res.send({"message":"Enquiry not added"})
          }
        }else{
            res.send({"message":"User Not Found,Sigin In Failed"})
        }
        }
        catch(e){
        res.send({"message":"Some Internal Error"})
        }
    })

    //update
    router.put('/updateenquiry/:id',auth,async(req,res)=>{
        const updateEnquiry = await Enquiry.findOneAndUpdate({_id:req.params.id,owner:req.user._id},req.body,{new:true, runValidators:true})
       try{
            console.log("updateEnquiry",updateEnquiry)
            if(!updateEnquiry){
            return res.send({message:"Can't update the Enquiry, please check again"})
             }
             res.send({message:"The Enquiry has been successfully updated",updateEnquiry})
        }catch(e){
            res.send({message:"Some Internal Error Occur"})
        }
    })
    
module.exports= router