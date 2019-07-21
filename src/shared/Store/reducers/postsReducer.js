export default (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_MY_POSTS':
      return [...payload.getMyPosts]

    case 'FETCH_MORE_POSTS':
      return [...state.concat(payload)]

    case 'DELETE_POST':
      return state.filter((post) => {
        return post.id !== payload
      })

    case 'CREATE_POST':
      return [...payload.concat(state)]

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
      const updatedPosts = state.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            comments: post.comments.concat(payload)
          }
        } else {
          return post
        }
      })
      return updatedPosts
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