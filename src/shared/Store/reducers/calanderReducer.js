import moment from 'moment'

export default (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_CALNDER_EVENTS':
      return payload
    case 'CREATE_EVENT':
      payload[0].day = parseInt(moment(payload[0].startDate).format('D'))
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