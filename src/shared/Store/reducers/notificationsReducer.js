const initialState = []

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_MY_NOTIFICATIONS':
        return state === initialState ? payload : [...state.concat(payload)]
    default:
      return state
  }
}