require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cookieparser = require("cookie-parser")

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cookieparser())

const routes = require("./routes/userRoutes")
app.use('/user', routes )

const url = process.env.MONGODB_URL

mongoose.connect(url, (err)=>{
    if(err) 
    throw err;

    console.log("Connected to the MongoDB!")
})

app.listen( PORT , () => {
    console.log("Server is running on port", PORT)
})

