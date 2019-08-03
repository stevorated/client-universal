const initialState = 0

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CLEAR_NEW_NOTIFICATIONS':
      return initialState
    case 'COUNT_NEW_NOTIFICATIONS':
      if(payload !== initialState && payload < 10) return payload
      if(payload !== initialState && payload >= 10) return 10
    default:
      return state
  }
}