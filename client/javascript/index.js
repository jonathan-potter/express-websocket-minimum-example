import React from 'react'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import Root from 'components'
import configureStore from 'utility/configureStore'
import socket from 'utility/configureWebsockets'
import * as actions from 'actions'
import 'css/app.scss'

const store = configureStore()
window.store = store

const { recieveCommand } = bindActionCreators(actions, store.dispatch)
socket.on('sendCommandToClient', command => recieveCommand(command))

ReactDOM.render(<Root store={store} />, document.getElementById('react-container'))
