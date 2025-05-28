const express = require('express')
const router = express.Router()
const Order = require('../model/orderModel')
const {auth} = require('../middleware/auth')

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
    console.log("req.user._id",req.user._id);
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

//Sort Order

router.get('/order',auth,async(req,res)=>{
    console.log("req.query.sortBy", req.query.sortBy) //asc
    console.log("req.user._id",req.user._id);

    const sort = {}
    const match = {}
    console.log(req.query.sortBy)
    if(req.query.sortBy){
        const parts=req.query.sortBy.split(":" )
           console.log("parts",parts)
           sort[parts[0]]=(parts[1]=="asc"?1:-1)
           console.log("sort",sort)
    }

        const getSortedOrder = await req.user.populate({path:"orderRel",
            match:match,
        options:{
            sort:sort
        }
     })
     if(!getSortedOrder){
        res.send({message:"Order Not Found"})
     }
     res.send({"OrderData":req.user.orderRel})
      
})

//RemoveOrder

module.exports=router