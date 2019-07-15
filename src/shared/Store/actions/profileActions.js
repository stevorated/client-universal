export const fetchUsersPosts = (data) => async (dispatch, getState, client) => {
  dispatch({
    type: 'FETCH_PROFILE_POSTS',
    payload: data
  })
}

export const clearUsersPosts = () => async (dispatch, getState, client) => {
  dispatch({
    type: 'CLEAR_PROFILE_POSTS'
  })
}

export const clearUsersPostsAndRefetch = (id) => async (dispatch, getState, client) => {
  // console.log(id)
  dispatch({
    type: 'CLEAR_PROFILE_POSTS'
  })
}