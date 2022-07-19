require("dotenv").config()
const path = require('path');
const express = require("express")
const mongoose = require("mongoose")

const PORT = process.env.PORT || 5000

const app = express()

//Routes
const userRoutes = require("./routes/userRoutes")
const iplRoutes = require('./routes/iplRoutes')
const gamingRoutes = require("./routes/gamingRoutes")
const payments = require('./routes/payments')
const stripeWebhookRoutes =require('./routes/stripeWebhookRoutes')

//Serving static content
app.use(express.static(path.join(__dirname, 'client/build')))

// app.use('/*',(req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });


//Entry point
app.use('/eb',stripeWebhookRoutes, iplRoutes, userRoutes, gamingRoutes, payments)
//mongdb connection
const url = process.env.MONGODB_URL

mongoose.connect(url, (err) => {
  if (err)
    throw err;

  console.log("Connected to the MongoDB!")
})

//Running server
app.listen(PORT, () => {
  console.log("Server is running on port", PORT)
})

