import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'

const mapStateToProps = ({ messages, onlineUsers, user }) => ({
  messages,
  onlineUsers,
  user
})

class App extends Component {
  onChange (callback) {
    return event => {
      const inputs = [event.target]
      const query = getQuery(inputs)

      return callback(query)
    }
  }

  onSubmit (callback) {
    return event => {
      event.preventDefault()

      const inputs = event.target.getElementsByTagName('input')
      const query = getQuery(inputs)

      return callback(query)
    }
  }

  render () {
    const { loginUser, messages, onlineUsers, sendMessage, user } = this.props

    return (
      <div>
        <form onSubmit={ this.onSubmit(sendMessage) }>
          <label htmlFor="name">Name</label>
          <input id="name-input" name="name" placeholder="name" onChange={ this.onChange(loginUser) } value={user.name}></input>
          <label htmlFor="room">Room</label>
          <input id="room-input" name="room" placeholder="room"></input>
          <label htmlFor="message">Message</label>
          <input id="message-input" name="message" placeholder="message"></input>
          <button>submit</button>
        </form>
        <h3>Online Users</h3>
        <ul>
          { this.renderUsers(onlineUsers) }
        </ul>
        <h3>Messages</h3>
        <ul>
          { this.renderMessages(messages) }
        </ul>
      </div>
    )
  }

  renderUsers (users) {
    return users.map((user, index) => (
      <li key={index}>{user.name}</li>
    ))
  }

  renderMessages (messages) {
    return messages.map((message, index) => {
      if (message.timestampCursor) {
        return (
          <li key={index}><hr /></li>
        )
      } else if (message.startupTime) {
        return (
          <li key={index}><hr /></li>
        )
      } else {
        return (
          <li key={index}>
            <b>{message.name}: </b>
            <span>{message.message}</span>
            <b> timestamp: </b>
            <span>{message.timestamp}</span>
          </li>
        )
      }
    })
  }
}

export default connect(mapStateToProps, actions)(App)

function getQuery (inputs) {
  return Array.from(inputs).reduce((query, input) => {
    query[input.name] = input.value
    return query
  }, {})
}
