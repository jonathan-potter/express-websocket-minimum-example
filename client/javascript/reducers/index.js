import { combineReducers } from 'redux'
import messages from 'reducers/messages'
import onlineUsers from 'reducers/onlineUsers'

export default combineReducers({
  messages,
  onlineUsers
})
