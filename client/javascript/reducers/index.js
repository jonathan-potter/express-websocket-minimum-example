import { combineReducers } from 'redux'
import createReducer from 'utility/createReducer'
import messages from 'reducers/messages'
import onlineUsers from 'reducers/onlineUsers'

export default combineReducers({
  messages,
  onlineUsers,
  user: createReducer('user', null)
})
