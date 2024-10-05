const express = require('express')
const router = express.Router()
const Order = require('../model/orderModel')
const auth = require('../middleware/auth')

// AddOrder
router.post('/addorder',auth,async(req,res)=>{
     try{
        const orderData = new Order({
            ...req.body,
            owner:req.user._id
        })
        if(!orderData){
            res.status(401).send({message:"Order cannot be added"})
        }await orderData.save()
        res.status(200).send({orderData:orderData,message:"Order has been added successfully!"})
    }catch(e){
        res.status(500).send({message:"Some internal error"})
    }
})

// GetOrder
router.get('/order',auth,async(req,res)=>{
    // try{
    console.log(req.user._id);
    if(req.user){
        const getOrder = await req.user.populate("orderRel")
        console.log("test",getOrder)
        if(getOrder){
            res.send({"orderData":req.user.orderRel})
        }else{
            res.send({message:"Order not Added"})
        }
    }else{
        res.send({message:"User not found, signin failed!"})
    }
    // }catch(e){
    //     res.send({message:"Some internal error"})
    // }
})

//RemoveOrder

module.exports=router