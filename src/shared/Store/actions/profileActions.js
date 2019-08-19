import { GET_USER, FETCH_USER_EVENTS } from '../Apollo/Queries'
import { NetworkStatus } from 'apollo-client'

export const fetchUserEventsAction = (data, id) => async (dispatch, getState, client) => {
  if(data.length) {
    dispatch({
      type: 'FETCH_PROFILE_EVENTS',
      payload: data
    })
  } 
  // else {

  //   const res = await client.query({
  //     query: FETCH_USER_EVENTS,
  //     variables: { id }
  //   })

  //   dispatch({
  //     type: 'FETCH_PROFILE_EVENTS',
  //     payload: res.data.user
  //   })
  // }
}

export const fetchUsersPosts = (data, id) => async (dispatch, getState, client) => {
  
  if(data.length) {
    dispatch({
      type: 'FETCH_PROFILE_POSTS',
      payload: data
    })
  } else {

    const res = await client.query({
      query: GET_USER,
      variables: { id }
    })

    dispatch({
      type: 'FETCH_PROFILE',
      payload: res.data.user
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