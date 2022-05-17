require("dotenv").config()
const path = require('path');
const express = require("express")
const mongoose = require("mongoose")
const cookieparser = require("cookie-parser")

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cookieparser())

//Routes
const userRoutes = require("./routes/userRoutes")
const iplRoutes = require('./routes/iplRoutes')
const gamingRoutes = require("./routes/gamingRoutes")

//Serving static content
app.use(express.static(path.join(__dirname ,'client/build')))

//Entry point
app.use('/eb',iplRoutes,userRoutes,gamingRoutes)

//mongdb connection
const url = process.env.MONGODB_URL

mongoose.connect(url, (err)=>{
    if(err) 
    throw err;

    console.log("Connected to the MongoDB!")
})

//Running server
app.listen( PORT , () => {
    console.log("Server is running on port", PORT)
})

