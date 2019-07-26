const initialState = []

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_PROFILE_POSTS':
      if (payload.length) {
        return payload[0].createdBy
      }
    case 'FOLLOW_USER':
      if(payload.length) {
        return {
          ...state,
          followers: payload.data.followers
        }

      }
    default:
      return state
  }
}

