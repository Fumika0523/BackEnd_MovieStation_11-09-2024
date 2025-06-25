const mongoose = require ('mongoose')

const orderSchema = new mongoose.Schema({
    movies:[
        {
            moviename:{type:String},
            movieposter:{type:String},
            amount:{type:Number,required:true},
            trailer:{type:String,required:true},
            trailer:{type:String,required:true},
        }
    ],
owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
}
},{
    timestamps:true
})

const Order = mongoose.model("Order",orderSchema)
module.exports = Order

//orderRoute >> amount default:250, moviename,movieposter,