const initialState = []

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CLEAR_FEED':
      return []
    case 'FETCH_FEED':
      return state === initialState ? payload : [...state.concat(payload)]
    case 'UPDATE_CURRENT_USER':
        const { fname, lname, username, bio } = payload
        return state.map((post) => {
          if(post.createdBy.id !== payload.id) return {
            ...post,
            comments: post.comments.map((comment)=> {
              if (comment.createdBy.id !== payload.id) return comment
              return {
                ...comment,
                createdBy: {
                  ...comment.createdBy,
                  fname,
                  lname,
                  username
                }
              }
            })
          }
          return {
            ...post,
            createdBy: {
              ...post.createdBy,
              fname,
              lname,
              username
            },
            comments: post.comments.map((comment)=> {
              if (comment.createdBy.id !== payload.id) return comment
              return {
                ...comment,
                createdBy: {
                  ...comment.createdBy,
                  fname,
                  lname,
                  username
                }
              }
            })
          }
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
