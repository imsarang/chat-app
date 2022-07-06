const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path:'./imp.env'})
const cors = require('cors')

const connectDB = require('./db/connectDB')
const port =  8080 || process.env.PORT
// Connection to database: 
connectDB()

app.listen(port,()=>{
    console.log(`Server is running on port number : ${port}`);
})
