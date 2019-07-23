export default (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_MY_NEXT_EVENTS':
      return payload
    default:
      return state
  }
}