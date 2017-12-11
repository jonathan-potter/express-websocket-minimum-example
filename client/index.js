(function () {

    window.addEventListener('submit', event => {
        event.preventDefault();
        inputs = event.srcElement.getElementsByTagName('input')
        const query = getQuery(inputs)
        something(query)
    });

    function getQuery (inputs) {
        return Array.from(inputs).reduce((query, input) => {
            query[input.name] = input.value;
            return query;
        }, {})
    }

    function something (userInfo) {
        var socket = io();
        socket.on('connect', function () { console.log('connected') });
        socket.emit('userInfo', userInfo);
        socket.on('onlineUsers', onlineUsers => console.log(onlineUsers));
        socket.on('online', function (data) { console.log('data', data) });
        socket.on('disconnect', function () { console.log('disconnected') });

    }


    // const SOCKET_URL = `ws://${location.host}/ws`;


    // const socket = new WebSocket(SOCKET_URL);
    // window.socket = socket

    // setInterval(() => {
    //     socket.send('rawr');
    // }, 5000);

    // socket.addEventListener('message', event => {
    //     console.log(event.data)
    // });

})();
