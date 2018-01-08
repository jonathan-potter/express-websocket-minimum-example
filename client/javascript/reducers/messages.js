const DEFAULT_STATE = [{
  timestamp: JSON.stringify(new Date()).replace(/"/g, ''),
  startupTime: true
}]

const timestampComparator = (a, b) => a.timestamp > b.timestamp ? 1 : -1

export default function (state = DEFAULT_STATE, action) {
  const { type, value } = action

  switch (type) {
    case 'SET_USER':
      return state
        .filter(message => !message.timestampCursor)
        .concat({ ...value, timestampCursor: true })
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
    case 'LOG':
      console.log(action.value)
      return state
    default:
      return state
  }
}
