import socket from 'utility/configureWebsockets'

export const loginUser = userInfo => (dispatch, getState) => {
  socket.emit('addUser', userInfo)
}

export const sendMessage = message => (dispatch, getState) => {
  socket.emit('sendMessage', {
    ...message,
    type: 'ADD_MESSAGE'
  })
}

export const setUsers = (users) => (dispatch, getState) => {
  const action = 'SET_USERS'
  console.log(users)
  dispatch({
    type: action,
    value: users
  })
}
