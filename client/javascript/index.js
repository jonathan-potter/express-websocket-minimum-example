import React from 'react'
import ReactDOM from 'react-dom'
import Root from 'components'
import configureStore from 'utility/configureStore'
import socket from 'utility/configureWebsockets'
import 'css/app.scss'

const store = configureStore()

socket.on('setUsers', users => {
  store.dispatch({
    type: 'SET_USERS',
    value: users
  })
})

socket.on('message', message => {
  console.log(message)
})

window.store = store

ReactDOM.render(<Root store={store} />, document.getElementById('react-container'))
