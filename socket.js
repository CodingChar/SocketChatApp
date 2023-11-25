const {io} = require('./index.js')


io.on('connection', socket => {
    console.log("User connected")
    console.log(socket)    
    socket.on('chat-message', (data) => {
        console.log(data)
        io.emit("server-message", data)
    })

    socket.on('disconnect', () => {
        console.log("User disconnected")
    })
})


