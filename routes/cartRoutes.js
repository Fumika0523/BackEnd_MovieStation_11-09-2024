const express = require('express')
const router = express.Router()
const Cart = require('../model/cartModel')
const {auth} = require('../middleware/auth')
const {conditionalAuth} = require('../middleware/auth')

// AddCart
// router.post('/addcart',async(req,res)=>{
//      try{
//         const cartData = new Cart({
//             ...req.body,
//             owner:req.user._id
//         })
//         if(cartData){
//             await cartData.save()
//         res.status(200).send({cartData:cartData,message:"Cart has been added successfully!"})
//         console.log(cartData,"Cart has been added successfully!")
//     }else{
//           return  res.send({message:"This movie is already added"})
//         }    
//     }catch(e){
//         // res.status(500).send({message:"Some internal error"})
//         console.log("error",e.code) // e >> entire messages show, e.code >> only error code show, // "e" is object
//         if (e.code==11000){
//            return  res.send({message:"This is a duplicated key"})
//         }else{
//             return res.send({message:"some internal error"})
//         }
//     }
// })


router.post('/addcart',conditionalAuth, async (req, res) => {
  try {
    const cartData = new Cart({ ...req.body }); // Removed 'owner' field since auth isn't needed

    if (cartData) {
      await cartData.save();
      res.status(200).send({ cartData, message: "Cart has been added successfully!" });
      console.log(cartData, "Cart has been added successfully!");
    } else {
      res.send({ message: "This movie is already added" });
    }
  } catch (e) {
    console.error("Error:", e.code); // Logs error code if available

    if (e.code === 11000) {
      res.send({ message: "This is a duplicated key" });
    } else {
      res.send({ message: "Some internal error occurred" });
    }
  }
});


// GetCart - 
router.get('/cart',conditionalAuth,async(req,res)=>{
    // try{
    // console.log(req.user._id);
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
    // }catch(e){
    //     res.send({message:"Some internal error"})
    // }
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