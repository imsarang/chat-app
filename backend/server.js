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
const server = app.listen(port,()=>{
    console.log(`Server is running on port number : ${port}`.yellow.bold);
})

// close the connection after pingTimeout seconds to save bandwidth
const io = require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:3000"
    }
})

// create connection
io.on("connection",(socket)=>{
    console.log(`Connected to socket.io`);

    // for setup : takes user data from frontend
    socket.on('setup',(userData)=>{
        socket.join(userData._id)
        console.log(userData.username);
        socket.emit(`connected`)
    })

    // for joining chat
    socket.on('join chat',(room)=>{
        socket.join(room._id)
        console.log(`User joined Room : ${room._id}`);
    })

    // for send/new message
    socket.on('new message',(newMsgRcv)=>{
        console.log(newMsgRcv);
        let chat = newMsgRcv.chat
        if(!chat?.users) return console.log(`chat.users not defined`);

        chat.users.forEach(user=>{
            if(user._id == newMsgRcv.sender._id) return
            
            // sending message to all the users except current logged in user!
            socket.in(user._id).emit("message recieved",newMsgRcv)
        })
    })

    socket.on('typing',(room)=>{
        socket.in(room).emit("typing")
    })
    socket.on('stop typing',(room)=>socket.in(room).emit(`Stop Typing`))
})