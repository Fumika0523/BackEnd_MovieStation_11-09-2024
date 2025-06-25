const mongoose = require ('mongoose')

const cartSchema = new mongoose.Schema({
moviename:{type:String},
movieposter:{type:String},
amount:{type:Number,required:true},
rating:{type:String,required:true},
trailer:{type:String,required:true},
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