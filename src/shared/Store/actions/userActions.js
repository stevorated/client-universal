import { GET_ME, GET_USERS } from '../Apollo/Queries'

export const fetchUsers = () => async (dispatch, getState, client) => {
  const {data} = await client.query({
    query: GET_USERS
  })
  dispatch({
    type: 'FETCH_USERS',
    payload: data
  })
}

export const fetchMyDetails = () => async (dispatch, getState, client) => {
  const { data } = await client.query({
    query: GET_ME
  })
  dispatch({
    type: 'FETCH_MY_DETAILS', 
    payload: data
  })
}