const socket = require('socket.io');

function socketWorld(server) { 
    const io = socket(server, { cors: { origin: '*' }}); 

    io.on('connection', function(socket) { 
        socket.emit('welcome', 'Welcome'); 
        socket.broadcast.emit('newuser', 'A new user connected'); 

        // catch message 
        socket.on('catchMsg', function(data) { 
            socket.broadcast.emit('takeMsg', data); // send 
        }) 

        socket.on('disconnect', function() { 
            socket.broadcast.emit('userquit', 'A user disconnected'); 
        }) 
    }) 
} 

module.exports = socketWorld; 

// Namespace 
// localhost:3000/
// localhost:3000/chat
// localhost:3000/notification
// localhost:3000/game
// localhost:3000/comment

// Room 