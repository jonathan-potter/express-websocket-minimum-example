const DEFAULT_STATE = []

export default function (state = DEFAULT_STATE, { type, ...value }) {
  switch (type) {
    case `ADD_MESSAGE`:
      return [
        ...state,
        value
      ]
    case 'RESET':
      return DEFAULT_STATE
    default:
      return state
  }
}
