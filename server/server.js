var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var { v4: uuid } = require('node-uuid');

server.listen(3000);

const users = {}
const onlineUsers = new Map()
const messages = []

app.post('/webhooks/webhook1', (req, res) => {
    console.log('post', 'webhook');
    io.emit('sendCommandToClient', {
        type: 'ADD_MESSAGE',
        value: {
            name: 'JIRA',
            message: 'something happened with an issue',
            timestamp: new Date()
        }
    });
    res.send('rawr')
});

io.on('connection', function (socket) {
    console.log('CONNECT')

    socket.on('sendCommandToServer', (command) => {
        console.log('command', command);

        command.timestamp = new Date()
        handleCommand(command, socket)
    });

    socket.on('disconnecting', function () {
        console.log('DISCONNECT');

        const user = onlineUsers.get(socket);
        if (users && user && users[user.name]) {
            users[user.name].timestamp = new Date() // last seen
        }

        onlineUsers.delete(socket);

        sendCommandToRooms(Object.values(socket.rooms), {
            type: 'SET_USERS',
            value: Array.from(onlineUsers.values())
        })
    });
});

function handleCommand (command, socket) {
    const rooms = Object.values(socket.rooms)

    switch(command.type) {
        case 'SET_USER': {
            const userInfo = command.value
            let user = users[userInfo.name]

            if (!user) {
                user = userInfo
                user.id = uuid()
                users[user.name] = user
            }

            onlineUsers.set(socket, user)

            socket.emit('sendCommandToClient', Object.assign(command, { value: user }))
            sendCommandToRooms(rooms, {
                type: 'SET_USERS',
                value: Array.from(onlineUsers.values())
            })
            break;
        }
        case 'JOIN_ROOMS': {
            socket.join(command.value.split(','))

            socket.emit('sendCommandToClient', {
                type: 'ADD_MESSAGES',
                value: messages
            });
            break;
        }
        case 'ADD_MESSAGE': {
            const message = command.value

            message.timestamp = command.timestamp
            messages.push(message)

            sendCommandToRooms([message.room], command)
            break;
        }
    }
}

function sendCommandToRooms (rooms, command) {
    rooms.forEach(room => {
        io.to(room).emit('sendCommandToClient', command)
    })
}
