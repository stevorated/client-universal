export default (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_EVENT':
      // console.log(payload)
      return payload
    default:
      return state
  }
}