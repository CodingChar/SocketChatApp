const {io} = require('./index.js')


let connections = 0

io.on('connection', socket => {
    connections+=1;

    //Global emits

    
    io.emit('client-joined', {
        username: "From Server",
        message: "*Someone just joined the chat!*"
    });
    io.emit('number-clients', connections)

    console.log("User connected")
    console.log(socket)    
    
    socket.on('disconnect-all', data => {
        io.disconnectSockets()
    })
    socket.on('chat-message', (data) => {
        console.log(data)
        io.emit("server-message", data)
    })

    socket.on('disconnect', () => {
        connections-=1;

        io.emit('number-clients', connections)
        
        console.log("User disconnected")
    })
})


