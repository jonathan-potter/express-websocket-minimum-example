import 'css/app.scss'
import io from 'socket.io-client'

window.addEventListener('submit', event => {
    event.preventDefault()
    const inputs = event.srcElement.getElementsByTagName('input')
    const query = getQuery(inputs)
    connect(query)
})

function getQuery (inputs) {
    return Array.from(inputs).reduce((query, input) => {
        query[input.name] = input.value
        return query
    }, {})
}

var socket = io('http://localhost:3000')

function connect (userInfo) {
    socket.on('connect', function () { console.log('connected') })
    socket.emit('userInfo', userInfo)
    socket.on('onlineUsers', users => {
        const usersList = document.getElementById('users-list')
        usersList.innerHTML = ''

        users
            .map(user => createElement({ type: 'li', content: user.name}))
            .forEach(user => usersList.append(user))
    })
    socket.on('online', function (data) { console.log('data', data) })
    socket.on('disconnect', function () { console.log('disconnected') })
}

function createElement ({ type, content }) {
    const element = document.createElement(type)

    element.innerHTML = content

    return element
}
