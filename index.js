const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const connection=require('./db/connection')
const movieRoutes=require('./routes/movieRoutes')
const userRoutes = require('./routes/userRoutes')
const enquiryRoutes = require('./routes/enquiryRoutes')
const orderRoutes = require('./routes/orderRoutes')
const cartRoutes =require('./routes/cartRoutes')

connection()

const cors = require('cors')
app.use(cors())

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
app.use(cartRoutes)

//server Start:
const PORT =8002
app.listen(PORT,()=>{
    console.log("Server Started at PORT",PORT)
})
