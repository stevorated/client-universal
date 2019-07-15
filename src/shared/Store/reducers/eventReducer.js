export default (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_EVENTS':
      // console.log(payload)
      return state[0] === undefined ? payload : [...state.concat(payload)]
    case 'CREATE_EVENT':
      return [...payload.concat(state)]
    default:
      return state
  }
}