import io from 'socket.io-client'
import queryString from 'query-string'

const { location } = window

const socket = io('http://localhost:3000')

const { rooms } = queryString.parse(location.search)
socket.emit('joinRooms', rooms)

socket.on('connect', function () { console.log('connected') })
socket.on('disconnect', function () { console.log('disconnected') })

export default socket
