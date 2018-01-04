const DEFAULT_STATE = [{
  timestamp: new Date(),
  startupTime: true
}]

const timestampComparator = (a, b) => new Date(a.timestamp) - new Date(b.timestamp)

export default function (state = DEFAULT_STATE, action) {
  const { type, ...value } = action

  switch (action.type) {
    case 'SET_USER':
      return state
        .filter(message => !message.timestampCursor)
        .concat({ ...action.value, timestampCursor: true })
        .sort(timestampComparator)
    case `ADD_MESSAGE`:
      return [
        ...state,
        value
      ].sort(timestampComparator)
    case `ADD_MESSAGES`:
      return action.value
        .concat(state)
        .sort(timestampComparator)
    case 'RESET':
      return DEFAULT_STATE
    default:
      return state
  }
}
