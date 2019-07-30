export default (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_EVENTS':
      return state[0] === undefined ? payload : [...state.concat(payload)]
    case 'CREATE_EVENT':
      return [...payload.concat(state)]
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