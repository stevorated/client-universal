import { GET_USER } from '../Apollo/Queries'
import { NetworkStatus } from 'apollo-client';

export const fetchUsersPosts = (data, id) => async (dispatch, getState, client) => {
  if(data.length) {
    dispatch({
      type: 'FETCH_PROFILE_POSTS',
      payload: data
    })
  } else {
    const refetchData = await client.query({
      query: GET_USER,
      variables: { id },
      fetchPolicy: 'network-only'
    })
    dispatch({
      type: 'FETCH_PROFILE',
      payload: [refetchData.data.user]
    })
  }
}

export const clearUsersPosts = () => async (dispatch, getState, client) => {
  dispatch({
    type: 'CLEAR_PROFILE_POSTS'
  })
}

export const clearUsersPostsAndRefetch = (id) => async (dispatch, getState, client) => {
  dispatch({
    type: 'CLEAR_PROFILE_POSTS'
  })
}

export const followUserAction = (data, userId) => async (dispatch, getState, client) => {
  // console.log('FOLLOW_USER')
  dispatch({
    type: 'FOLLOW_USER',
    payload: {
      data,
      userId
    }
  })
}