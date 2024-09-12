const mongoose = require ('mongoose')

const orderSchema = new mongoose.Schema({
movieName:{type:String,required:true},
rating:{type:Number,required:true},
amount:{type:Number,required:true},
})

const Order = mongoose.model("Order",orderSchema)
module.exports = Order