const mongoose = require ('mongoose')

const enquirySchema = new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true},
    mobilePhoneNum:{type:Number,required:true},
    subject:{type:String,required:true},
    description:{type:String,required:true},
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true // you need the user id
    }
},{
    timestamps:true
})

const Enquiry = mongoose.model("Enquiry",enquirySchema)

module.exports = Enquiry