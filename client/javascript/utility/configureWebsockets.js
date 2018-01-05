import io from 'socket.io-client'

const socket = io('http://localhost:3000')

socket.on('connect', function () { console.log('connected') })
socket.on('disconnect', function () { console.log('disconnected') })

export default socket
