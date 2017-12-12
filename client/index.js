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

    var socket = io();

    function something (userInfo) {
        socket.on('connect', function () { console.log('connected') });
        socket.emit('userInfo', userInfo);
        socket.on('onlineUsers', users => {
            const usersList = document.getElementById('users-list');
            usersList.innerHTML = '';

            users
                .map(user => createLI(user.name))
                .forEach(user => usersList.append(user))
        });
        socket.on('online', function (data) { console.log('data', data) });
        socket.on('disconnect', function () { console.log('disconnected') });

    }

    function createLI (content) {
        const li = document.createElement('li')

        li.innerHTML = content

        return li
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
