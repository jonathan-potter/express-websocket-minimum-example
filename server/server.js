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

        socket.join(userInfo.room);
        socket.room = userInfo.room

        onlineUsers.set(socket, userInfo);

        socket.to(socket.room).emit('setUsers', Array.from(onlineUsers.values()));
    });

    socket.on('sendMessage', ({ room, message }) => {
        console.log('message', message);

        const rooms = Object.keys(socket.rooms)
        console.log('rooms', Object.keys(socket.rooms));

        io.to(room).emit('message', { room, message });
    });

    socket.on('disconnect', function () {
        console.log(onlineUsers.get(socket));

        onlineUsers.delete(socket);

        socket.emit('setUsers', Array.from(onlineUsers.values()));
    });
});
