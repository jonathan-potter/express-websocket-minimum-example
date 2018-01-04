const DEFAULT_STATE = []

const timestampSorter = (a, b) => a.timestamp > b.timestamp

export default function (state = DEFAULT_STATE, action) {
  const { type, ...value } = action

  switch (action.type) {
    case 'SET_USER':
      return state
        .filter(message => !message.timestampCursor)
        .concat({ ...action.value, timestampCursor: true })
        .sort(timestampSorter)
    case `ADD_MESSAGE`:
      return [
        ...state,
        value
      ].sort(timestampSorter)
    case `ADD_MESSAGES`:
      return action.value
        .concat(state)
        .sort(timestampSorter)
    case 'RESET':
      return DEFAULT_STATE
    default:
      return state
  }
}
