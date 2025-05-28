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

    console.log("req.query.orderid",req.query.orderid)
    console.log("req.user.orderid",req.user._id)
    console.log(req.user.name)
    console.log("moviename",req.query.moviename)
    console.log(req.query.orderdate)
    // inside objective

doc.fontSize(25).text(`Invoice Generated for ${req.user.name}${req.user.lastname}`)
.moveDown(0.5)
doc.fontSize(18).text(`Oder ID : ${req.query.orderid}`)
.moveDown(0.5)
doc.fontSize(18).text(`Oder Date : ${req.query.orderdate}`)
.moveDown(0.5)
doc.fontSize(18).text(`Movies: ${req.query.moviename}`)
.moveDown(1)
doc.fontSize(18).text(`Total Price: ${req.query.totalprice}`);


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
