const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const Movie = require('./model/movieModel')
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
app.post("/getinvoice",auth,async(req,res)=>{ 
    //posting data from front-end (req.body), get << to retrieve the data
    //set Header >> Postman/Browser >> Need to download
res.setHeader("content-Type","application/pdf")
res.setHeader("content-Disposition","attachment ; filename=order-summary.pdf")
    // res.json({ message: 'Invoice received!' });
    //create a document
const doc = new PDFDocument({margin:50,size:"A4"})
doc.pipe(res)

const {orderid,orderdate,totalprice,movies} =req.body
// console.log(orderid,orderdate,totalprice,movies)
doc.fontSize(21).text(`Invoice Generated for ${req.user.name}`).moveDown(1)
doc.fontSize(16).text(`Order ID: ${orderid}`).moveDown(0.5)
doc.fontSize(16).text(`Oder Date : ${req.query.orderdate}`).moveDown(1)

//Table Title
doc.fontSize(18).text("Ordered Movies:",{underline:true} ) .moveDown(0.5)
function drawTableRow(doc,y,row,widths){
let x = 50; 
row.forEach((cell,i)=>{
doc.text(cell,x,y,{width:widths[i],align:"left"})
x+=widths[i]
})
}

const tableHeaders = ["Movie Name", "Price" /*, "totalPrice" */];
const colWidths = [350, 100];

// Set smaller font size for table headers
doc.fontSize(15.5); // You can adjust this number to your preferred smaller size
drawTableRow(doc, doc.y, tableHeaders, colWidths);

// Reset font size back to normal for the rest of the document
doc.fontSize(16);

// const tableHeaders =["Movie Name","Price", // ,"totalPrice"
// ]

// const colWidths=[350,100]
// drawTableRow(doc,doc.y,tableHeaders,colWidths)
// doc.fontSize(16)
// do
// const items=[
//     {moviname:`${req.query.moviename}`,price:`${req.query.price}`,totalPrice:`${req.query.totalprice}`},
//      {moviename:`${req.query.moviename}`},   
//     {moviename:`${req.body}`}
// ]

movies.forEach((element)=>{
    // const finalPrice = element.qty*element.amount
    drawTableRow(doc,doc.y,[element.moviename,element.amount],colWidths)
})

 doc    
        .fontSize(5)
        .moveTo(50, doc.y + 10)
        .lineTo(550, doc.y + 10)
        .stroke()
      

    doc.moveDown(3);
    //Finalize the PDF
    // console.log("req.query.orderid",req.query.orderid)
    // console.log("req.user.userid",req.user._id)
    // console.log("firtname",req.user.name)
    // console.log("moviename",req.query.moviename)
    // console.log(req.query.orderdate)
    // console.log(req.body)
    // inside objective

// doc.fontSize(25).text(`Invoice Generated for ${req.user.name}`)

doc.fontSize(16).text(`Total Price: $ ${totalprice}`)
// doc.fontSize(18).text(`Total Price: ${req.query.totalprice}`);

// Table Header
// const tableTop = doc.y;
// const itemX = 50; //width
// const movieX = 100;//width
// const priceX = 400;//width

// doc.fontSize(14).text("S.No",itemX,tableTop).text("Movie Name",movieX,tableTop).text("Price(USD)",priceX,tableTop)

// Header Underline
// doc.moveTo(itemX,tableTop + 18).lineTo(550,tableTop + 18).stroke();

// Table Rows >> drawTable
// let positionY = tableTop + 30;
// movies.forEach((movie,index)=>{
// doc.fontSize(12).text(index + 1, itemX, positionY).text(movie.moviename, movieX, positionY).text(`$${movie.amount}`,priceX,positionY);
// positionY += 20 
// })

// doc.moveTo(itemX,positionY +10).lineTo(550,positionY + 10).stroke()

//Total Price
// doc.fontSize(16).text(`Total Price: USD ${totalprice}`,priceX,positionY + 20, {align:"right"})

doc.end()
})

app.use(movieRoutes)
app.use(userRoutes)
app.use(enquiryRoutes)
app.use(orderRoutes)
app.use(cartRoutes)
app.use(wishRoutes)

//server Start:
const PORT =process.env.PORT || 8002
app.listen(PORT,()=>{
    //console.log("Server Started at PORT",PORT)
})
