const DEFAULT_STATE = []

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case `SET_USERS`:
      return action.value
    case `ADD_USER`:
      return [
        ...state,
        action.value
      ]
    case 'RESET':
      return DEFAULT_STATE
    default:
      return state
  }
}
