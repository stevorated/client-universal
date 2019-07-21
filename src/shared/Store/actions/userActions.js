import { GET_MA_DETAILS, GET_ME, GET_USERS, GET_MA_POSTS } from '../Apollo/Queries'

export const fetchUsers = () => async (dispatch, getState, client) => {
  const {data} = await client.query({
    query: GET_USERS
  })
  dispatch({
    type: 'FETCH_USERS',
    payload: data
  })
}

export const fetchCurrentUser = () => async (dispatch, getState, client) => {

  const {data} = await client.query({
    query: GET_ME,

  })
  dispatch({
    type: 'FETCH_CURRENT_USER', 
    payload: data
  })
}

export const fetchMyDetails = () => async (dispatch, getState, client) => {
  const { data } = await client.query({
    query: GET_MA_DETAILS,
    notifyOnNetworkStatusChange
  })
  dispatch({
    type: FETCH_MY_DETAILS, 
    payload: data
  })
}