export default (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_MY_EVENTS':
      // console.log(payload)
      return state[0] === undefined ? payload : [...state.concat(payload)]
    case 'CREATE_EVENT':
      // console.log([payload])
      return [...payload.concat(state)]
    default:
      return state
  }
}