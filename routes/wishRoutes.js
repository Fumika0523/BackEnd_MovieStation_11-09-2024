const express = require('express')
const router = express.Router()
const Wish = require('../model/wishModel')
const {auth} = require('../middleware/auth')


// AddCart
router.post('/add-wish-list',auth,async(req,res)=>{
     try{
        const wishData = new Wish({
            ...req.body,
            owner:req.user._id
        })
        if(wishData){
            await wishData.save()
        res.status(200).send({wishData:wishData,message:"Wish item has been added successfully!"})
        console.log(wishData,"Wish Item has been added successfully!")
    }else{
          return  res.send({message:"This movie is already added"})
        }    
    }catch(e){
        // res.status(500).send({message:"Some internal error"})
        console.log("error",e.code) // e >> entire messages show, e.code >> only error code show, // "e" is object
        if (e.code==11000){
           return  res.send({message:"This is a duplicated key"})
        }else{
            return res.send({message:"some internal error"})
        }
    }
})

// GetCart - 
router.get('/wish-list',auth,async(req,res)=>{
     try{
    console.log(req.user._id);
     if(req.user){
      const getWishList = await req.user.populate("wishRel")
     console.log("test",getWishList)
      if(getWishList){
            res.send({"wishData":req.user.wishRel})
        }else{
            res.send({message:"Wish Item is not Added"})
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
router.delete('/clear-wish-list',auth,async(req,res)=>{
try{
    const wishMovie = await Wish.deleteMany({
        owner:req.user._id
    })
    if(!wishMovie){
        res.send({message:"Wish Item Not Found"})
    }
    res.send({message:"Wish Item has been delete successfully",wishMovie})
}catch(e){
res.send({message:"some internal error"})
}
})

// DELETE 
router.delete('/delete-wish-item/:id',auth,async(req,res)=>{
    try{
    console.log("Delete WIsh Item by ID",req.params.id)
    const deleteWish = await Wish.findOneAndDelete({
        _id:req.params.id,owner:req.user._id
    })
    if(!deleteWish){
        res.send({message:"Wish Items Not Found"})
    }res.send({message:"Wish Item has been deleted successfully",deleteWish})
 }catch(e){
            res.send({message:"Some Internal Error"})
        }
})

module.exports=router