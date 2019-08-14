import {
  FbLoginCheck,
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
  EventPage,
  NotificationsPage,
  SinglePostPage,
  ResetCallbackPage,
  SomethingWentWrongPage
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
        path: '/reset_pass_callback/:token',
        exact: true,
        ...ResetCallbackPage
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
        path: '/post/:id',
        exact: true,
        ...SinglePostPage,
      },
      {
        path: '/engage-gauge',
        exact: true,
        ...EngagePage,
      },
      {
        path: '/notifications',
        exact: true,
        ...NotificationsPage,
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
        path: '/fblanding',
        exact: true,
        ...FbLoginCheck
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
        path: '/somethingwentwrong',
        exact: true,
        ...SomethingWentWrongPage
      },
      {
        ...NotFoundPage
      }
    ]
  } 
]

export default routes