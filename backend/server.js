const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path:'./imp.env'})
const cors = require('cors')
const colors = require('colors')
const connectDB = require('./db/connectDB')
const port =process.env.PORT||5000
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const path = require('path')
const cookieParser = require('cookie-parser')

app.use(express.json())
// Connection to database: 
connectDB()
// app.use(cors())

// routes:
// app.use('/user',)
app.use(cookieParser('EXPRESS_SESSION_SECRET'))
app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)
// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname + `/frontend/chat/build/index.html`))
// })
app.listen(port,()=>{
    console.log(`Server is running on port number : ${port}`.yellow.bold);
})
