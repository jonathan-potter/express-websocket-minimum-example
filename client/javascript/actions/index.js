import socket from 'utility/configureWebsockets'

export const recieveCommand = message => (dispatch, getState) => {
  dispatch(message)
}

export const loginUser = userInfo => (dispatch, getState) => {
  socket.emit('sendCommandToServer', {
    type: 'SET_USER',
    value: userInfo
  })
}

export const sendMessage = message => (dispatch, getState) => {
  socket.emit('sendCommandToServer', {
    type: 'ADD_MESSAGE',
    value: message
  })
}

export const joinRooms = rooms => (dispatch, getState) => {
  socket.emit('sendCommandToServer', {
    type: 'JOIN_ROOMS',
    value: rooms
  })
}
