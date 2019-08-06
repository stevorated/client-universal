import { FETCH_EVENTS, FETCH_MY_EVENTS } from '../Apollo/Queries'

export const followEventAction = (data, event) => async (dispatch, getState, client) => {
  dispatch({
    type: 'FOLLOW_EVENT',
    payload: { data, event }
  })
}

export const fetchCalanderEvents = (data) => (dispatch, getState, client) => {
  dispatch({
    type: 'FETCH_CALNDER_EVENTS',
    payload: data
  })
}

export const createEventAction = (data) => (dispatch, getState, client) => {
  dispatch({
    type: 'CREATE_EVENT',
    payload: [data]
  })
}

export const fetchEvent = (data, limit) => async (dispatch, getState, client) => {
  dispatch({
    type: 'FETCH_EVENT',
    payload: data
  })
}

export const fetchEvents = (data, limit) => async (dispatch, getState, client) => {
  if(!data) {
    const fetchEventsQuery = await client.query({
      query: FETCH_EVENTS,
      variables: { limit: 5 }
    })
    dispatch({
      type: 'FETCH_EVENTS',
      payload: fetchEventsQuery.data.getEventsFeed
    })
  } else {
    dispatch({
      type: 'FETCH_EVENTS',
      payload: data
    })

  }
}


export const fetchMyEvents = (data, limit) => async (dispatch, getState, client) => {
  if(!data) {
    const fetchEventsQuery = await client.query({
      query: FETCH_MY_EVENTS,
      variables: { limit: 5 }
    })
    console.log(fetchEventsQuery.data.getMyEventsFeed)
    dispatch({
      type: 'FETCH_MY_EVENTS',
      payload: fetchEventsQuery.data.getMyEventsFeed
    })
  } else {
    dispatch({
      type: 'FETCH_MY_EVENTS',
      payload: data
    })

  }
}

export const fetchNextEvents = (data, limit) => async (dispatch, getState, client) => {
  dispatch({
    type: 'FETCH_NEXT_EVENTS',
    payload: data
  })
}

export const fetchMyNextEvents = (data, limit) => async (dispatch, getState, client) => {
  dispatch({
    type: 'FETCH_MY_NEXT_EVENTS',
    payload: data
  })
}