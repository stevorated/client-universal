export const fetchMyNotifications = (data, limit) => async (dispatch, getState, client) => {
  dispatch({
    type: 'FETCH_MY_NOTIFICATIONS',
    payload: data
  })
}