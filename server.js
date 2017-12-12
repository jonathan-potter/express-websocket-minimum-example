var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var { v4: uuid} = require('node-uuid');

server.listen(3000);

app.use('/client', express.static('client'))

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/client/index.html');
});

const onlineUsers = new Map();

io.on('connection', function (socket) {
    socket.on('userInfo', userInfo => {
        console.log('userInfo', userInfo);
        console.log('socket', onlineUsers.get(socket))

        onlineUsers.set(socket, userInfo);
        console.log('onlineUsers', Array.from(onlineUsers.values()))
        io.emit('onlineUsers', Array.from(onlineUsers.values()));
    });

    socket.on('disconnect', function () {
        console.log('before', Array.from(onlineUsers.values()))
        onlineUsers.delete(socket);
        console.log('after', Array.from(onlineUsers.values()))
        io.emit('onlineUsers', Array.from(onlineUsers.values()));
    });
});
