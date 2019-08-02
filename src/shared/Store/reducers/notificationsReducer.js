const initialState = []

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_MY_NOTIFICATIONS':
      return state === initialState ? payload : [...state.concat(payload)]
    case 'FETCH_FIRST_NOTIFICATION':
      console.log(payload)
      const filteredPayload = state.filter((item) => {
        // console.log(item.originId, payload.originId)
        return item.originId === payload[0].originId
      })
      if(!filteredPayload.length) {
        return [...payload.concat(state)]
      }
    default:
      return state
  }
}