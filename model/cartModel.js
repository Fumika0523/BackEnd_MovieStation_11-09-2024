const mongoose = require ('mongoose')

const cartSchema = new mongoose.Schema({
moviename:{type:String},
movieposter:{type:String},
amount:{type:Number,default:250},
owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
}
},{
    timestamps:true
})

const Cart = mongoose.model("Cart",cartSchema)
module.exports = Cart

//orderRoute >> amount default:250, moviename,movieposter,