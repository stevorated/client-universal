export default (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_MY_POSTS':
      return [...payload.getMyPosts]

    case 'FETCH_MORE_POSTS':
      return [...state.concat(payload)]

    case 'DELETE_POST':
        return state.filter((post)=> {
          return post.id !== payload
        })

    case 'CREATE_POST':
      return [...payload.concat(state)]

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