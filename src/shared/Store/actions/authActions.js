import { LOGIN_USER_MUT, LOGOUT_USER} from '../Apollo/Mutaions'
import { GET_ME } from '../Apollo/Queries'

export const fetchCurrentUser = () => async (dispatch, getState, client) => {
  try {
    const {data} = await client.query({
      query: GET_ME,
    })
    dispatch({
      type: 'FETCH_CURRENT_USER', 
      payload: data
    })
  } catch (e) {

  }   
}

export const updateCurrentUser = (data) => async (dispatch, getState, client) => {

    dispatch({
      type: 'UPDATE_CURRENT_USER', 
      payload: data
    })
}

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

  await client.mutate({
    mutation: LOGOUT_USER
  })
  setTimeout(()=> {
    client.cache.reset()
    client.resetStore()
    dispatch({
      type: 'LOGOUT_USER',
      payload: null
    })
  }, 200)

  
}

export const checkUserLoggedOut = () => async (dispatch, getState, client) => {

  dispatch({
    type: 'LOGOUT_USER',
    payload: null
  })
  
  client.cache.reset()
  client.resetStore()
}
