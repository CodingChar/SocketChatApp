const {io} = require('./index.js')


let connections = 0

io.on('connection', socket => {
    connections+=1;

    //Global emits
    io.emit('number-clients', connections)

    console.log("User connected")
    console.log(socket)    
    

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


