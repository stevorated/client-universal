import { combineReducers } from 'redux'
import authReducer from './authReducer'
import userReducer from './usersReducer'
import postsReducer from './postsReducer'
import feedReducer from './feedReducer'
import profilePostsReducer from './profilePostsReducer'
import myEventsReducer from './myEventsReducer'
import eventReducer from './eventReducer'
import singleEventReducer from './singleEventReducer'
import profileDataReducer from './profileData'
import nextFeedReducer from './nextFeedReducer'
import nextBoardReducer from './nextBoardReducer'
const appReducer = combineReducers({
  users: userReducer,
  auth: authReducer,
  posts: postsReducer,
  feed: feedReducer,
  profilePosts: profilePostsReducer,
  profileDetails: profileDataReducer,
  nextFeedEvents: nextFeedReducer,
  nextBoardEvents: nextBoardReducer,
  myEvents: myEventsReducer,
  events: eventReducer,
  event: singleEventReducer
})

export default (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = {}
  }

  return appReducer(state, action)
}

