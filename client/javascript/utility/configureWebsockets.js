import io from 'socket.io-client'

// const socket = io('http://localhost:3000')
const socket = io('http://jpotter.ngrok.io')

socket.on('connect', function () { console.log('connected') })
socket.on('disconnect', function () { console.log('disconnected') })

export default socket
