export const pushComment = (data) => (dispatch, getState, client) => {

  dispatch({
    type: 'PUSH_COMMENT',
    payload: data
  })
}


export const deleteCommentAction = (comment, post) => async (dispatch, getState, client) => {
  
  await dispatch({
    type: 'DELETE_COMMENT',
    payload: {
      post,
      comment 
    }
  })
} 