const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const connection=require('./db/connection')
const movieRoutes=require('./routes/movieRoutes')
const userRoutes = require('./routes/userRoutes')
const enquiryRoutes = require('./routes/enquiryRoutes')
const orderRoutes = require('./routes/orderRoutes')
connection()

const cors = require('cors')
app.use(cors())

// CREATE  a route for home Page
const User=require('./model/userModel')
const Movie=require('./model/movieModel')
const Order=require('./model/orderModel')

//Multer > File/Image Upload
//we want some data to be sent out >> what method would be used? > POST

app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Welcome to MovieStation")
})
app.use(movieRoutes)
app.use(userRoutes)
app.use(enquiryRoutes)
app.use(orderRoutes)

//server Start:
const PORT=8001
app.listen(PORT,()=>{
    console.log("Server Started at PORT",PORT)
})
