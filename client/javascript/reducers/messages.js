const DEFAULT_STATE = []

export default function (state = DEFAULT_STATE, action) {
  const { type, ...value } = action

  switch (action.type) {
    case `ADD_MESSAGE`:
      return [
        ...state,
        value
      ]
    case `ADD_MESSAGES`:
      return action.value.concat(state)
    case 'RESET':
      return DEFAULT_STATE
    default:
      return state
  }
}
