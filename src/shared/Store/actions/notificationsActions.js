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

export const countNewNotifications= (data, seen) => async (dispatch, getState, client) => {
  const seenArray = seen.map((item)=>item.id)
  const filteredData = data.filter((item)=> seenArray.includes(item.originId))
  const diff = 10 - filteredData.length
  dispatch({
    type: 'COUNT_NEW_NOTIFICATIONS',
    payload: diff
  })
}

export const clearNewNotifications= (data, seen) => async (dispatch, getState, client) => {
  dispatch({
    type: 'CLEAR_NEW_NOTIFICATIONS',
  })
}