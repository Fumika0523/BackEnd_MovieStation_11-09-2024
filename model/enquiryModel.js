const mongoose = require ('mongoose')

const enquirySchema = new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:false},
    email:{type:String,required:true},
    phone_number:{type:String,required:true},
    subject:{type:String,required:true},
    description:{type:String,required:true},
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:false // you need the user id
    }
},{
    timestamps:true
})

const Enquiry = mongoose.model("Enquiry",enquirySchema)

module.exports = Enquiry