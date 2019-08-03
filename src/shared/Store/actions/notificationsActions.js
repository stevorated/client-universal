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
  if (!seen) {
    return dispatch({
      type: 'COUNT_NEW_NOTIFICATIONS',
      payload: 0
    })
  }
  const seenArray = seen.map((item)=>item.id)

  const filteredData = data.filter((item)=> seenArray.includes(item.originId))
  const diff = seen.length > 10 ? 10 - filteredData.length : data.length - seen.length || 0
  console.log(seen, data, diff)
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