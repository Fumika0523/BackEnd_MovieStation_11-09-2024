const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const Movie = require('../BackEnd_MovieStation_11-09-2024/model/movieModel')
const PDFDocument=require('pdfkit')
const connection=require('./db/connection')
const movieRoutes=require('./routes/movieRoutes')
const userRoutes = require('./routes/userRoutes')
const enquiryRoutes = require('./routes/enquiryRoutes')
const orderRoutes = require('./routes/orderRoutes')
const cartRoutes =require('./routes/cartRoutes')
const wishRoutes = require('./routes/wishRoutes')
const {auth} = require('./middleware/auth')


connection()

const cors = require('cors')
app.use(cors())


//Multer > File/Image Upload
//we want some data to be sent out >> what method would be used? > POST

app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Welcome to MovieStation")
})
//auth
app.get("/getinvoice",auth,async(req,res)=>{
    //create a document
   const doc = new PDFDocument({margin:50,size:"A4"})

    //browser/postman
    //set Header >> Postman/Browser >> Need to download
    res.setHeader("content-Type","application/pdf")
    res.setHeader("content-Disposition","attachment ; filename=moviestation.pdf")
    doc.pipe(res)
//Finalize the PDF

//invoice generated for order ID
    console.log("1",req.params.orderid)
    console.log("2",req.body.orderid)
    console.log("3",req.query.orderid)
    console.log(req.user._id)
    console.log("req.user",req.user)
    const getById = await Movie.findById(req.params._id)
    console.log(getById)
    console.log(req.user.name)
    console.log(req.movie)
    console.log(req.order)
    const order_Date = new Date().toLocaleDateString()

//order by username, order date
//how you will pass ? req.params,req.body,req.query

doc.fontSize(35).text(`${req.query.orderid}`)
doc.end()
})
app.use(movieRoutes)
app.use(userRoutes)
app.use(enquiryRoutes)
app.use(orderRoutes)
app.use(cartRoutes)
app.use(wishRoutes)

//server Start:
const PORT =8002
app.listen(PORT,()=>{
    console.log("Server Started at PORT",PORT)
})
