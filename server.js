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
    console.log('connection initiated');

    socket.on('userInfo', userInfo => {
        console.log('userInfo', userInfo);

        onlineUsers.set(socket, userInfo);

        io.emit('onlineUsers', Array.from(onlineUsers.values()));
    });

    socket.on('disconnect', function () {
        console.log(onlineUsers.get(socket));

        onlineUsers.delete(socket);

        io.emit('onlineUsers', Array.from(onlineUsers.values()));
    });
});
