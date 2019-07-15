import { GET_MA_DETAILS, GET_ME, GET_USERS, GET_MA_POSTS } from '../../Apollo/Queries/'
import { LOGIN_USER_MUT, LOGOUT_USER } from '../../Apollo/Mutaions'

export const pushComment = (data) => (dispatch, getState, client) => {

  dispatch({
    type: 'PUSH_COMMENT',
    payload: data
  })
}