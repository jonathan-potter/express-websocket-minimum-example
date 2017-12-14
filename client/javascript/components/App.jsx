import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'

const mapStateToProps = ({ onlineUsers }) => ({
  loginUser: actions.loginUser,
  onlineUsers
})

class App extends Component {
  onSubmit = event => {
    const { loginUser } = this.props

    event.preventDefault()
    const inputs = event.target.getElementsByTagName('input')
    const query = getQuery(inputs)
    loginUser(query)
  }

  onMessage = event => {
    const { sendMessage } = this.props

    event.preventDefault()
    const inputs = event.target.getElementsByTagName('input')
    const query = getQuery(inputs)
    sendMessage(query)
  }

  render () {
    const { onlineUsers } = this.props

    return (
      <div>
        <ul id='users-list'>
          { this.renderUsers(onlineUsers) }
        </ul>
        <form onSubmit={this.onSubmit}>
          <input id="name-input" name="name" placeholder="name"></input>
          <button>submit</button>
        </form>
        <form onSubmit={this.onMessage}>
          <input id="room-input" name="room" placeholder="room"></input>
          <input id="message-input" name="message" placeholder="message"></input>
          <button>submit</button>
        </form>
      </div>
    )
  }

  renderUsers (users) {
    return users.map((user, index) => (
      <li key={index}>{user.name}</li>
    ))
  }
}

export default connect(mapStateToProps, actions)(App)

function getQuery (inputs) {
  return Array.from(inputs).reduce((query, input) => {
    query[input.name] = input.value
    return query
  }, {})
}
