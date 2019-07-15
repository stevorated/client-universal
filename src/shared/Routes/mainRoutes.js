import {
  TestPage,
  LoginPage,
  RegisterPage,
  PublicPage, 
  NotFoundPage, 
  ProfilePage,
  FeedPage,
  UserProfilePage,
  PrivacyPolicyPage,
  CalanderPage,
  PreferencesPage,
  EventFeedPage,
  EventBoardPage,
  SettingsPage,
  EngagePage,
  EventPage
} from '../Pages'
import App from '../App'

const routes = [
  {
    ...App,
    routes: [
      {
        path: '/',
        exact: true,
        ...PublicPage
      },
      {
        path: '/my-profile',
        exact: true,
        ...ProfilePage,
      },
      {
        path: '/feed',
        exact: true,
        ...FeedPage,
      },
      {
        path: '/event-feed',
        exact: true,
        ...EventFeedPage,
      },
      {
        path: '/event-board',
        exact: true,
        ...EventBoardPage,
      },
      {
        path: '/event/:id',
        exact: true,
        ...EventPage,
      },
      {
        path: '/engage-gauge',
        exact: true,
        ...EngagePage,
      },
      {
        path: '/settings',
        exact: true,
        ...SettingsPage,
      },

      {
        path: '/login',
        exact: true,
        ...LoginPage
      },
      {
        path: '/register',
        exact: true,
        ...RegisterPage
      },
      {
        path: '/logout',
        exact: true,
        ...LoginPage
      },
      {
        path: '/test',
        exact: true,
        ...TestPage
      },
      {
        path: '/preferences',
        exact: true,
        ...PreferencesPage
      },
      {
        path: '/calander',
        exact: true,
        ...CalanderPage
      },
      {
        path: '/privacy',
        exact: true,
        ...PrivacyPolicyPage
      },
      {
        path: '/profile/:id',
        exact: true,
        ...UserProfilePage,
      },
      {
        ...NotFoundPage
      }
    ]
  } 
]

export default routes