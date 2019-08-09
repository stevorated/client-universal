export default (state = null, { payload, type }) => {
  
  switch (type) {
    case 'FETCH_CURRENT_USER':
      return payload.me || false
    case 'FETCH_MY_DETAILS':
      return payload.me || false
    case 'LOGIN_USER':
      return payload.signIn || false
    case 'REGISTER_USER':
      return payload.signUp || false
    case 'LOGOUT_USER':
      return null
    case 'UPDATE_AVATAR':
      const avatar = { url: payload }
      return { ...state, avatar }
    case 'CREATE_POST':
      const newPost = [{ id: payload[0].id }]
      return { ...state, posts: newPost.concat(state.posts) }
    case 'DELETE_POST':
      const newposts = state.posts.filter((post) => {
        return post.id !== payload
      })
      return { ...state, posts: newposts }
    case 'FOLLOW_USER':
      const userObjArray = [{ id: payload.userId }]
      const filtered = state.following && state.following.length && state.following.filter((follow) => { return follow.id === payload.userId})
      if(filtered === undefined) return {
        ...state,
        following: [userObjArray]
      }
      if(filtered) {
        const res = {
          ...state,
          following: state.following.filter(follow => {
            return follow.id !== payload.userId
          })
        }
        return res
      } else {
        const res = {
          ...state,
          following: userObjArray.concat(state.following)
        }
        return res
      }
    default:
      return state
  }
}