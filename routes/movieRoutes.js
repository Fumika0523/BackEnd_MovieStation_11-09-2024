const express= require('express')
const router=express.Router()
const Movie = require('../model/movieModel')
const {auth} = require('../middleware/auth')

router.post('/addmovie',auth,async(req,res)=>{
      try{
        const movieData = new Movie({
            ...req.body, //making the copy of req.body
            owner:req.user._id // this one I need to update
        })
        console.log(req.body)
        if(!movieData){res.status(401).send({message:"Movie cannot be added"})}
        await movieData.save()
        res.status(200).send({movieData:movieData,message:"Movie has been added successfully"})
         }catch(e){
        res.status(500).send({message:"Some internal Error"})
    }
})

//GET  with Auth
router.get('/specificmovie',auth,async(req,res)=>{
    try{
        console.log(req.user._id);
        if(req.user){
            let getMovie=await req.user.populate("movieRel")
            console.log("test",getMovie) 
            if(getMovie){
                res.send({"movieData":req.user.movieRel})
            }else{
                res.send({"message":"Movie not added"})
            }
        }else{
            res.send({"message":"User Not Found,Sigin In Failed"})
        }}
catch(e){
        res.send({"message":"Some Internal Error"})
    }
})

router.get('/movie',async(req,res)=>{
    // try{
        const allMovies = await Movie.find()
        // inside objective
        res.send({"movieData":allMovies})
//     }catch(e){
//         res.send({message:"Some Internal Error"})
//     }
 })

//UPDATE
router.put('/updatemovie/:id',auth,async(req,res)=>{
    const updateMovie = await Movie.findOneAndUpdate({_id:req.params.id,owner:req.user._id},req.body,{new:true, runValidators:true})
    try{
        console.log(updateMovie)
        if(!updateMovie){
        return res.send({message:"Can't update the Movie, please check again"})
         }
         res.send({message:"The Movie has been successfully updated",updateMovie})
    }catch(e){
        res.send({message:"Some Internal Error Occur"})
    }
})

//Edit >> GET Movie
router.get('/movie/:id',auth,async(req,res)=>{
     try{
        if(req.user){
            const getById = await Movie.findById(req.params.id)
            if(!getById) {
              return  res.send({message:"The movie is not found"})
            }
            // res.send({message:"getById",getById}) //top of the object and object >> error
            res.send(getById)
        }
        }
        catch(e){
            res.send({"message":"Some Internal Error"})
        }
})

//DELETE
router.delete('/deletemovie/:id',auth,async(req,res)=>{
    // try{
        console.log("Delete Movie by ID",req.params.id)
        const deleteMovie = await Movie.findOneAndDelete({
            _id:req.params.id,owner:req.user._id
        })
        if(!deleteMovie){
            res.send({message:"Movie Not Found"})
        }
        res.send({message:"Movie has been deleted successfully",deleteMovie})
        // }catch(e){
        //     res.send({message:"Some Internal Error"})
        // }
})

module.exports=router