const mongoose=require('mongoose')
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    gender:{type:String,required:true},
    phone_number:{type:Number,required:true},
    email:{type:String,required:true},
    password:{type:String}
},{
    timestamps:true
})

userSchema.methods.generateAuthToken = async function(req,res){
    const user = this
    const token = jwt.sign({_id:user.id},process.env.JWT_SECRET_KEY)
    console.log(token)
    return token
}

userSchema.virtual('movieRel',{
    ref:"Movie",
    localField:"_id",
    foreignField:"owner"
})

// userSchema.virtual('enquiryRel',{
//     ref:"Enquiry",
//     localField:"_id",
//     foreignField:"owner"
// })

userSchema.virtual('orderRel',{
    ref:"Order",
    localField:"_id",
    foreignField:"owner"
})

userSchema.virtual('cartRel',{
    ref:"Cart",
    localField:"_id",
    foreignField:"owner"
}
)

const User = mongoose.model("User",userSchema)

module.exports=User

