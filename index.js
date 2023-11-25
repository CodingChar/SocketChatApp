const express = require('express');
const { createServer } = require('http');
const {Server} = require('socket.io')

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: true
}) 

app.use(express.static('./public'))


app.get('/', (req,res) => {
    res.sendFile('index.html')
})
server.listen(8000, (err) => {
    console.log(`http://localhost:8000`)
})

module.exports = {io}

require('./socket.js') //Socket.io events and more