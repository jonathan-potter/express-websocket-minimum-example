var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.use('/client', express.static('client'))

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/client/index.html');
});

const onlineUsers = {};

io.on('connection', function (socket) {
    socket.on('userInfo', userInfo => {
        const { sessionID } = socket;
        console.log('userInfo', userInfo);

        onlineUsers[sessionID] = userInfo;
        io.emit('onlineUsers', onlineUsers);
    });

    socket.on('disconnect', function () {
        const { sessionID } = socket;
        delete onlineUsers[sessionID];
        io.emit('onlineUsers', onlineUsers);
    });
});
