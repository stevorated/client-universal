const initialState = []

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_PROFILE_EVENTS':
      return state === initialState ? payload : [...state.concat(payload)]
    case 'FOLLOW_EVENT':
      return state.map((event)=> {
        if(event.id !== payload.event) {
          return event
        }
        return {
          ...event,
          followers: payload.data.followers
        }
      })
    default:
      return state
  }
}