var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

const onlineUsers = new Map();

io.on('connection', function (socket) {
    console.log('connection initiated');

    socket.on('joinRooms', rooms => {
        console.log('rooms joined', rooms)
        socket.join(rooms)
    })

    socket.on('addUser', userInfo => {
        console.log('addUser', userInfo);

        onlineUsers.set(socket, userInfo);
        console.log(socket.rooms)

        Object.values(socket.rooms).forEach(room => {
            io.to(room).emit('setUsers', Array.from(onlineUsers.values()));
        })
    });

    socket.on('sendMessage', (message) => {
        console.log('message', message);

        const rooms = Object.keys(socket.rooms)
        console.log('rooms', Object.keys(socket.rooms));

        io.to(message.room).emit('message', message);
    });

    socket.on('disconnect', function () {
        console.log(onlineUsers.get(socket));

        onlineUsers.delete(socket);

        Object.values(socket.rooms).forEach(room => {
            io.to(room).emit('setUsers', Array.from(onlineUsers.values()));
        })
    });
});
