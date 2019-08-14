const initialState = []

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CREATE_POST':
      if (!state.length) return payload
      if (state[0]) {
        return state[0].createdBy.id === payload[0].createdBy.id ? [...payload.concat(state)] : state

      }
      return state
    case 'LIKE_POST':
      return state.map((post)=> {
        if(post.id !== payload.post) {
          return post
        }
        return {
          ...post,
          likes: payload.data.likes
        }
      })

    case 'PUSH_COMMENT':
      const { id } = payload.post
      return state.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            comments: post.comments.concat(payload)
          }
        } else {
          return post
        }
      })
    case 'FETCH_PROFILE_POSTS':
      return state[0] === undefined ? payload : [...state.concat(payload)]
    case 'CLEAR_PROFILE_POSTS':
      return initialState
    case 'DELETE_POST':
      return state.filter((post) => {
        return post.id !== payload
      })
    case 'DELETE_COMMENT':
      const res = state.map((post) => {
        if (post.id === payload.post) {
          return {
            ...post,
            comments: post.comments.filter((comment) => {
              return comment.id !== payload.comment
            })
          }
        } else {
          return post
        }
      })
      return res
    default:
      return state
  }
}
