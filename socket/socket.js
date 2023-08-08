const socket = require('socket.io');

function socketWorld(server) {
    const io = socket(server, { cors: { origin: '*' }}); 


    io.on('connection', function(socket) { 
        // catch message 
        socket.on('catchMsg', function(data) { 
            console.log({data});
            socket.broadcast.emit('takeMsg', data); // send 
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