const express = require('express')
const router = express.Router()
const Cart = require('../model/cartModel')
const auth = require('../middleware/auth')

// AddCart
router.post('/addcart',auth,async(req,res)=>{
    //  try{
        const cartData = new Cart({
            ...req.body,
            owner:req.user._id
        })
        if(!cartData){
            res.status(401).send({message:"cart cannot be added"})
        }await cartData.save()
        res.status(200).send({cartData:cartData,message:"Cart has been added successfully!"})
    // }catch(e){
    //     res.status(500).send({message:"Some internal error"})
    // }
})

// GetCart
router.get('/cart',auth,async(req,res)=>{
    try{
    console.log(req.user._id);
    if(req.user){
        const getCart = await req.user.populate("cartRel")
        console.log("test",getCart)
        if(getCart){
            res.send({"cartData":req.user.cartRel})
        }else{
            res.send({message:"Cart not Added"})
        }
    }else{
        res.send({message:"User not found, signin failed!"})
    }
    }catch(e){
        res.send({message:"Some internal error"})
    }
})

//RemoveCart
//Delete all > Clear Cart
router.delete('/clearcart',auth,async(req,res)=>{
// try{
    const cartMovie = await Cart.deleteMany({
        owner:req.user._id
    })
    if(!cartMovie){
        res.send({message:"Cart Not Found"})
    }
    res.send({message:"Cart has been delete successfully",cartMovie})
// }catch(e){
// res.send({message:"some internal error"})
// }
})

module.exports=router

// Buy now button >> order summry