export default (state = null, { payload, type }) => {
  switch (type) {
    case 'FETCH_CURRENT_USER':
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
      const newPost = [{id:payload[0].id}]
      return { ...state, posts: newPost.concat(state.posts)}
    case 'DELETE_POST':
        const newposts = state.posts.filter((post)=> {
          return post.id !== payload
        })
        return { ...state, posts: newposts }
    default: 
      return state
  }
}