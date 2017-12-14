import io from 'socket.io-client'

const socket = io('http://localhost:3000')

const rooms = window.location.hash.slice(1).split(',')
socket.emit('joinRooms', rooms)

socket.on('connect', function () { console.log('connected') })
socket.on('disconnect', function () { console.log('disconnected') })

export default socket
