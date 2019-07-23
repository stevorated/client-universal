export default (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_NEXT_EVENTS':
      return payload
    default:
      return state
  }
}