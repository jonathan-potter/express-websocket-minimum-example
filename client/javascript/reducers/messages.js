const DEFAULT_STATE = [{
  timestamp: JSON.stringify(new Date()).replace('"', ''),
  startupTime: true
}]

const timestampComparator = (a, b) => a.timestamp > b.timestamp ? 1 : -1

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
