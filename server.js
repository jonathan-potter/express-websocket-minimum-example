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
let online = 1;

io.on('connection', function (socket) {
  onlineUsers[socket.handshake.sessionID] = socket.handshake.session;
  online = Object.keys(onlineUsers).length;
  socket.broadcast.emit('online', online);

  socket.on('disconnect', function () {
    delete onlineUsers[socket.handshake.sessionID];
    online--;
    socket.broadcast.emit('online', online);
  });
});
