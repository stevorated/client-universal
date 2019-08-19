import { GET_NOTIFICATIONS } from '../../../shared/Store/Apollo/Queries'

const getLastNotifications = [
  {
    id: '5d5abc44903945cb7cb62f08',
    originId: '5d59958ebc31150b5c05f209',
    createdAt: '1566152078198',
    type: 'Comment',
    lastAction: 'Create-Comment',
    from: {
      id: '5d596c1152d7d62044d8d72c',
      fname: 'ya',
      lname: 'alla'
    },
    to: {
      id: '5d59593cbc88b03f707e388d',
      fname: 'shirel',
      lname: 'garber'
    },
    post: {
      id: '5d5960c152d7d62044d8d72a',
      body: 'fdsfdsfsd'
    },
    comment: {
      id: '5d59958ebc31150b5c05f208',
      body: 'cxvxcvxcvxc'
    },
    event: null,
    unread: true,
    show: true
  },
  {
    id: '5d5abc44903945cb7cb62f02',
    originId: '5d599555bc31150b5c05f207',
    createdAt: '1566152021566',
    type: 'PostLikes',
    lastAction: 'Like-Post',
    from: {
      id: '5d596c1152d7d62044d8d72c',
      fname: 'ya',
      lname: 'alla'
    },
    to: {
      id: '5d596c1152d7d62044d8d72c',
      fname: 'ya',
      lname: 'alla'
    },
    post: {
      id: '5d596e4b52d7d62044d8d732',
      body: 'aaaaaaaaaaaa'
    },
    comment: null,
    event: null,
    unread: true,
    show: true
  },
  {
    id: '5d5abc44903945cb7cb62f00',
    originId: '5d598e49bc31150b5c05f206',
    createdAt: '1566150217499',
    type: 'EventFollowers',
    lastAction: 'Follow-Event',
    from: {
      id: '5d596c1152d7d62044d8d72c',
      fname: 'ya',
      lname: 'alla'
    },
    to: {
      id: '5d596c1152d7d62044d8d72c',
      fname: 'ya',
      lname: 'alla'
    },
    post: null,
    comment: null,
    event: {
      id: '5d597ee852d7d62044d8d736',
      name: 'ssssssssss'
    },
    unread: true,
    show: true
  },
  {
    id: '5d5abc44903945cb7cb62f0a',
    originId: '5d597ee852d7d62044d8d737',
    createdAt: '1566146280117',
    type: 'Event',
    lastAction: 'Create-Event',
    from: {
      id: '5d596c1152d7d62044d8d72c',
      fname: 'ya',
      lname: 'alla'
    },
    to: null,
    post: null,
    comment: null,
    event: {
      id: '5d597ee852d7d62044d8d736',
      name: 'ssssssssss'
    },
    unread: true,
    show: true
  },
  {
    id: '5d5abc44903945cb7cb62f09',
    originId: '5d596e4b52d7d62044d8d733',
    createdAt: '1566142027704',
    type: 'Post',
    lastAction: 'Create-Post',
    from: {
      id: '5d596c1152d7d62044d8d72c',
      fname: 'ya',
      lname: 'alla'
    },
    to: null,
    post: {
      id: '5d596e4b52d7d62044d8d732',
      body: 'aaaaaaaaaaaa'
    },
    comment: null,
    event: null,
    unread: true,
    show: true
  },
  {
    id: '5d5abc44903945cb7cb62f07',
    originId: '5d596dd252d7d62044d8d731',
    createdAt: '1566141906434',
    type: 'PostLikes',
    lastAction: 'Like-Post',
    from: {
      id: '5d596c1152d7d62044d8d72c',
      fname: 'ya',
      lname: 'alla'
    },
    to: {
      id: '5d59593cbc88b03f707e388d',
      fname: 'shirel',
      lname: 'garber'
    },
    post: {
      id: '5d5960c152d7d62044d8d72a',
      body: 'fdsfdsfsd'
    },
    comment: null,
    event: null,
    unread: true,
    show: true
  },
  {
    id: '5d5abc44903945cb7cb62eff',
    originId: '5d596dc252d7d62044d8d730',
    createdAt: '1566141890717',
    type: 'UserFollowers',
    lastAction: 'Follow-User',
    from: {
      id: '5d596c1152d7d62044d8d72c',
      fname: 'ya',
      lname: 'alla'
    },
    to: {
      id: '5d59593cbc88b03f707e388d',
      fname: 'shirel',
      lname: 'garber'
    },
    post: null,
    comment: null,
    event: null,
    unread: true,
    show: true
  }
]

export const GET_NOTIFICATIONS_MOCK = [
  {
    request: {
      query: GET_NOTIFICATIONS,
      variables: { limit: 9, skip: 1 }
    },
    result: {
      data: { getLastNotifications }
    }
  },
  {
    request: {
      query: GET_NOTIFICATIONS,
      variables: { limit: 1, skip: 0 }
    },
    result: {
      data: { getLastNotifications: [
        {
          id: '5d5abc44903945cb7cb62f04',
          originId: '5d599592bc31150b5c05f20b',
          createdAt: '1566152082854',
          type: 'Comment',
          lastAction: 'Create-Comment',
          from: {
            id: '5d596c1152d7d62044d8d72c',
            fname: 'ya',
            lname: 'alla'
          },
          to: {
            id: '5d59593cbc88b03f707e388d',
            fname: 'shirel',
            lname: 'garber'
          },
          post: {
            id: '5d5960c152d7d62044d8d72a',
            body: 'fdsfdsfsd'
          },
          comment: {
            id: '5d599592bc31150b5c05f20a',
            body: 'xcvcxvxcvxc'
          },
          event: null,
          unread: true,
          show: true
        }
      ] }
    }
  }
]