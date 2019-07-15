const initialState = []

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CLEAR_FEED':
      return []
    case 'FETCH_FEED':
      return state[0] === undefined ? payload : [...state.concat(payload)]
      
    case 'CREATE_POST':
        return [...payload.concat(state)]
    
    case 'DELETE_POST':
    return state.filter((post)=> {
      return post.id !== payload
    })

    case 'PUSH_COMMENT':
        const { id } = payload.post
        const updatedComments = state.map((post) => {
          if (post.id === id) {
            return {
              ...post,
              comments: post.comments.concat(payload)
            }
          } else {
            return post
          }
        })
        return updatedComments
    default:
      return state
  }
}

