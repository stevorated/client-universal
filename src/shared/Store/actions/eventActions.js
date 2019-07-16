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
  dispatch({
    type: 'FETCH_EVENTS',
    payload: data
  })
}


export const fetchMyEvents = (data, limit) => async (dispatch, getState, client) => {
  dispatch({
    type: 'FETCH_MY_EVENTS',
    payload: data
  })
}