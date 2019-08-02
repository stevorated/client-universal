export const fetchMyNotifications = (data, limit) => async (dispatch, getState, client) => {
  dispatch({
    type: 'FETCH_MY_NOTIFICATIONS',
    payload: data
  })
}

export const fetchFirstNotifications = (data, limit) => async (dispatch, getState, client) => {
  dispatch({
    type: 'FETCH_FIRST_NOTIFICATION',
    payload: data
  })
}