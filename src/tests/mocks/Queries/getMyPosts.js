import { FETCH_MORE_POSTS } from '../../../shared/Store/Apollo/Queries'

export const getMyPosts = [
  {
    id: '5d4bccd91b07390fec7e7a13',
    body: 'dsfsfds',
    createdAt: '1565248729994',
    likes: [
      {
        id: '5d456a7de559a623484395d7'
      }
    ],
    createdBy: {
      id: '5d456a7de559a623484395d7',
      fname: 'chandler',
      lname: 'bing',
      username: 'chandler',
      avatar: {
        url: '/images/avatars/avatar_1564830879626_5d456a7de559a623484395d7.jpg'
      },
      posts: [
        {
          id: '5d4bccd91b07390fec7e7a13'
        },
        {
          id: '5d4a9ca49540cf12bc815727'
        }
      ],
      following: [
        {
          id: '5d4a86229540cf12bc8156d9'
        },
        {
          id: '5d45c1fd1e602f28608948e1'
        }
      ],
      followers: []
    },
    comments: []
  },
  {
    id: '5d4a9ca49540cf12bc815727',
    body: 'fgdgdfgfd',
    createdAt: '1565170852040',
    likes: [
      {
        id: '5d456a7de559a623484395d7'
      }
    ],
    createdBy: {
      id: '5d456a7de559a623484395d7',
      fname: 'chandler',
      lname: 'bing',
      username: 'chandler',
      avatar: {
        url: '/images/avatars/avatar_1564830879626_5d456a7de559a623484395d7.jpg'
      },
      posts: [
        {
          id: '5d4bccd91b07390fec7e7a13'
        },
        {
          id: '5d4a9ca49540cf12bc815727'
        }
      ],
      following: [
        {
          id: '5d4a86229540cf12bc8156d9'
        },
        {
          id: '5d45c1fd1e602f28608948e1'
        }
      ],
      followers: []
    },
    comments: []
  }
]


export const FETCH_MY_POSTS_MOCK = [
  {
    request: {
      query: FETCH_MORE_POSTS,
      variables: { limit: 5, skip: 5}
    },
    result: {
      data: { getMyPosts }
    }
  }
]
