const mongoose=require('mongoose')

const movieSchema = new mongoose.Schema({
    movieposter:{type:String,required:true},
    moviename:{type:String,required:true},
    rating:{type:String,required:true},
    summary:{type:String,required:true},
    cast:{type:String,required:true},
    trailer:{type:String,required:true},
    publishYear:{type:Number,required:true},
    likeNum:{type:String,required:true},
    disLikeNum:{type:String,required:true},
    genres:{type:String,required:false},
    category:{type:String,required:true},
    amount:{type:String,required:true},
    owner:{ //user ID
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", 
        required:true //you need the user id,
    }
},{
    timestamps:true
})

const Movie = mongoose.model("Movie",movieSchema)

module.exports=Movie
