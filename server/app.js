const port = process.env.PORT || 3000
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
require('dotenv').config()

// import controller
const controller = require('./controller')

// import routes
const routes = require('./routes')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(port, ()=>{
    console.log('server running on port:'+port)
})

const io = require('socket.io')(server)

let allClients = []
io.on('connection', (socket)=>{
    console.log("connected to Socket! "+socket.id)
    allClients.push(socket);

    socket.on('addChat', (Chat)=>{
        console.log('addChat socket:'+JSON.stringify(Chat))
        controller.postChat(io, Chat)
    })

    socket.on('setOnline', (username)=>{
        controller.setOnline(io,username)
        console.log(onlineStatus)
    })

    socket.on('getRealtimePersons', ()=>{
    	controller.getRealtimeCoordinate(io)
    })

    socket.on('disconnect',()=>{
        console.log('got disconnect!'+socket.id)
    	let i = allClients.indexOf(socket)
        allClients.splice(i,1)
    })
})


app.use('/api', routes)
