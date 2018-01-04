var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var { v4: uuid } = require('node-uuid');

server.listen(3000);

const users = {}
const onlineUsers = new Map()
const messages = []

io.on('connection', function (socket) {
    console.log('connection initiated')

    socket.on('joinRooms', rooms => {
        console.log('rooms joined', rooms)
        socket.join(rooms)

        socket.emit('ADD_MESSAGES', messages)
    })

    socket.on('addUser', userInfo => {
        let user = users[userInfo.name]

        if (!user) {
            user = userInfo
            user.id = uuid()
            users[user.name] = user
        }

        console.log('addUser', user);

        onlineUsers.set(socket, user)

        socket.emit('updateUser', user)

        Object.values(socket.rooms).forEach(room => {
            io.to(room).emit('setUsers', Array.from(onlineUsers.values()));
        })
    });

    socket.on('sendCommand', (message) => {
        console.log('message', message);

        message.timestamp = new Date()
        handleMessage(message)

        io.to(message.room).emit('recieveCommand', message);
    });

    socket.on('disconnect', function () {
        console.log('DISCONNECT');

        const user = onlineUsers.get(socket);
        if (users && user && users[user.name]) {
            users[user.name].timestamp = new Date() // last seen
        }

        onlineUsers.delete(socket);

        Object.values(socket.rooms).forEach(room => {
            io.to(room).emit('setUsers', Array.from(onlineUsers.values()));
        })
    });
});

function handleMessage (message) {
    switch(message.type) {
        case 'ADD_MESSAGE':
            messages.push(message)
    }
}
