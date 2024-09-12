const express = require ('express')
const app = express()
const dotenv=require('dotenv')
dotenv.config()
const connection=require('./db/connection')
connection()

//Create a route for home page

app.get('/',(req,res)=>{
    res.send("Welcome to MovieStation")
})

const PORT = 8001
app.listen(PORT,()=>{
    console.log("Server Started at PORT NO",PORT)
})