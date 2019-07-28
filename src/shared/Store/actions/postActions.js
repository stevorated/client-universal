import { GET_MA_DETAILS, GET_ME, GET_USERS, GET_MA_POSTS, GET_POSTS, FETCH_FEED } from '../Apollo/Queries'

export const fetchPost = (data) => async (dispatch, getState, client) => {
  dispatch({
    type: 'FETCH_SINGLE_POST',
    payload: data
  })
}
export const fetchMyPosts = (count = 5) => async (dispatch, getState, client) => {
  try {
    if (count > 10) {
      count = 10
    }
    const { data } = await client.query({
      query: GET_MA_POSTS,
      variables: { limit: count }
      // fetchPolicy: 'network-only'
    })
    dispatch({
      type: 'FETCH_MY_POSTS',
      payload: data
    })
  } catch (err) {

  }
}

export const clearFeed = () => async (dispatch, getState, client) => {
  dispatch({
    type: 'CLEAR_FEED'
  })
}

export const fetchFeed = (BrowserData, count = 5) => async (dispatch, getState, client) => {

  try {
    if (count > 10) {
      count = 10
    }
    const data = BrowserData ? BrowserData : await client.query({
      query: FETCH_FEED,
      variables: { limit: count }
    })
    dispatch({
      type: 'FETCH_FEED',
      payload: data
    })
  } catch (err) {

  }
}

export const fetchMoreMyPosts = (data) => async (dispatch, getState, client) => {
  dispatch({
    type: 'FETCH_MORE_POSTS',
    payload: data
  })
}

export const createPost = (data) => async (dispatch, getState, client) => {
  await dispatch({
    type: 'CREATE_POST',
    payload: [data]
  })
}

export const likePostAction = (data, post) => async (dispatch, getState, client) => {
  // console.log(data.likes)
  await dispatch({
    type: 'LIKE_POST',
    payload: { data, post }
  })
}

export const deletePostAction = (id) => async (dispatch, getState, client) => {

  await dispatch({
    type: 'DELETE_POST',
    payload: id
  })
}
