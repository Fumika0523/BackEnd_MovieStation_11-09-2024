const mongoose = require ('mongoose')

const orderSchema = new mongoose.Schema({
movieName:{type:String,required:true},
Rating:{type:Number,required:true},
Amount:{type:Number,required:true},
})

const Order = mongoose.model("Order",orderSchema)
mocule.exports = Order