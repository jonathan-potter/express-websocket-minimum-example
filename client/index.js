(function () {

    // const SOCKET_URL = `ws://${location.host}/ws`;

    var socket = io();
    socket.on('connect', function () { console.log('connected') });
    socket.on('online', function (data) { console.log('data', data) });
    socket.on('disconnect', function () { console.log('disconnected') });

    // const socket = new WebSocket(SOCKET_URL);
    // window.socket = socket

    // setInterval(() => {
    //     socket.send('rawr');
    // }, 5000);

    // socket.addEventListener('message', event => {
    //     console.log(event.data)
    // });

})();
