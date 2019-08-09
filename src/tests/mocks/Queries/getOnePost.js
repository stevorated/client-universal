import { FETCH_FEED } from '../../../shared/Store/Apollo/Queries'



export const getPosts = [
  {
    id: '5d4a877d9540cf12bc8156e7',
    body: 'dsfsdfsdfds',
    createdAt: '1565165437828',
    likes: [
      {
        id: '5d4a86229540cf12bc8156d9'
      },
      {
        id: '5d456a7de559a623484395d7'
      }
    ],
    createdBy: {
      id: '5d4a86229540cf12bc8156d9',
      fname: 'chandler',
      lname: 'gadol',
      username: 'mishue',
      avatar: {
        url: '/images/avatars/avatar_1565167540853_5d4a86229540cf12bc8156d9.jpg'
      },
      posts: [
        {
          id: '5d4a877d9540cf12bc8156e7'
        },
        {
          id: '5d4a876f9540cf12bc8156e2'
        }
      ],
      following: [
        {
          id: '5d46832e6074102470f01f62'
        }
      ],
      followers: [
        {
          id: '5d456a7de559a623484395d7'
        }
      ]
    },
    comments: [
      {
        id: '5d4a99339540cf12bc81571e',
        body: 'dfgdfgdfgfd',
        createdAt: '1565169971194',
        createdBy: {
          id: '5d4a86229540cf12bc8156d9',
          fname: 'chandler',
          lname: 'gadol',
          avatar: {
            url: '/images/avatars/avatar_1565167540853_5d4a86229540cf12bc8156d9.jpg'
          }
        }
      },
      {
        id: '5d4a99f99540cf12bc815725',
        body: 'sdfsdfsdsd',
        createdAt: '1565170169797',
        createdBy: {
          id: '5d456a7de559a623484395d7',
          fname: 'chandler',
          lname: 'bing',
          avatar: {
            url: '/images/avatars/avatar_1564830879626_5d456a7de559a623484395d7.jpg'
          }
        }
      },
      {
        id: '5d4a9cae9540cf12bc815729',
        body: 'cvbcvbcv',
        createdAt: '1565170862100',
        createdBy: {
          id: '5d456a7de559a623484395d7',
          fname: 'chandler',
          lname: 'bing',
          avatar: {
            url: '/images/avatars/avatar_1564830879626_5d456a7de559a623484395d7.jpg'
          }
        }
      }
    ]
  }
]

export const FETCH_FEED_SINGLE_POST_MOCK = [
  {
    request: {
      query: FETCH_FEED,
      variables: { id: "5d4a877d9540cf12bc8156e7" , limit: 1, skip: 0 }
    },
    result: {
      data: { getPosts }
    }
  }
]
