import { LOGIN_USER_MUT, LOGOUT_USER } from '../Apollo/Mutaions'

export const registerUser = (data) => (dispatch, getState, client) => {
  dispatch({
    type: 'REGISTER_USER',
    payload: data
  })
}


export const loginUser = (email, password) => async (dispatch, getState, client) => {
  const {data} = await client.mutate({
    variables: {email, password},
    mutation: LOGIN_USER_MUT
  })
  
  dispatch({
    type: 'LOGIN_USER',
    payload: data
  })
}

export const logoutUser = () => async (dispatch, getState, client) => {

  const {data} = await client.mutate({
    mutation: LOGOUT_USER
  })
  dispatch({
    type: 'LOGOUT_USER',
    payload: null
  })
  
  client.cache.reset()
  client.resetStore()
}

export const checkUserLoggedOut = () => async (dispatch, getState, client) => {

  dispatch({
    type: 'LOGOUT_USER',
    payload: null
  })
  
  client.cache.reset()
  client.resetStore()
}
