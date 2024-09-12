const mongoose = require ('mongoose')

const contactUsSchema = new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true},
    mobilePhoneNum:{type:Number,required:true},
    subject:{type:String,required:true},
    description:{type:String,required:true},

})

const ContactUs = mongoose.model("ContactUs",contactUsSchema)
module.exports = ContactUs