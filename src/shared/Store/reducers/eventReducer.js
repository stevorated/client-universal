export default (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_EVENTS':
      return state[0] === undefined ? payload : [...state.concat(payload)]
    case 'CREATE_EVENT':
      return [...payload.concat(state)]
    default:
      return state
  }
}