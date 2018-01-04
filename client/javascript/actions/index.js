import socket from 'utility/configureWebsockets'

export const loginUser = userInfo => (dispatch, getState) => {
  dispatch({
    type: 'SET_USER',
    value: userInfo
  })

  socket.emit('addUser', userInfo)
}

export const sendMessage = message => (dispatch, getState) => {
  socket.emit('sendCommand', {
    ...message,
    type: 'ADD_MESSAGE'
  })
}

export const recieveCommand = message => (dispatch, getState) => {
  dispatch(message)
}

export const setUsers = users => (dispatch, getState) => {
  const action = 'SET_USERS'
  console.log(users)
  dispatch({
    type: action,
    value: users
  })
}
