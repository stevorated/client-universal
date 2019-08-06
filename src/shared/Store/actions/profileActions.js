import { GET_USER } from '../Apollo/Queries'
import { NetworkStatus } from 'apollo-client';

export const fetchUsersPosts = (data, id) => async (dispatch, getState, client) => {
  if(data.length) {
    dispatch({
      type: 'FETCH_PROFILE_POSTS',
      payload: data
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