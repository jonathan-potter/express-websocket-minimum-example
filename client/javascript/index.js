import React from 'react'
import ReactDOM from 'react-dom'
import queryString from 'query-string'
import Root from 'components'
import configureStore from 'utility/configureStore'
import socket from 'utility/configureWebsockets'
import * as actions from 'actions'
import 'css/app.scss'

const { location } = window

const store = configureStore()

const { name } = queryString.parse(location.search)

actions.loginUser({ name })(store.dispatch, store.getState)
socket.on('recieveCommand', command => {
  actions.recieveCommand(command)(store.dispatch, store.getState)
})

socket.on('setUsers', users => {
  store.dispatch({
    type: 'SET_USERS',
    value: users
  })
})

socket.on('ADD_MESSAGES', messages => store.dispatch({
  type: 'ADD_MESSAGES',
  value: messages
}))

socket.on('updateUser', user => {
  store.dispatch({
    type: 'SET_USER',
    value: user
  })
})

window.store = store

ReactDOM.render(<Root store={store} />, document.getElementById('react-container'))
