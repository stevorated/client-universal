const initialState = []

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_PROFILE':
      return payload
    case 'FETCH_PROFILE_POSTS':
      return payload[0].createdBy
    case 'FOLLOW_USER':
      if(payload.data) {
        return {
          ...state,
          followers: payload.data.followers
        }

      }
    default:
      return state
  }
}
