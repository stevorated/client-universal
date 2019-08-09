import { FETCH_FEED } from '../../../shared/Store/Apollo/Queries'



export const getPosts = [
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
        url:
          '/images/avatars/avatar_1564830879626_5d456a7de559a623484395d7.jpg'
      },
      posts: [
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
        url:
          '/images/avatars/avatar_1565167540853_5d4a86229540cf12bc8156d9.jpg'
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
            url:
              '/images/avatars/avatar_1565167540853_5d4a86229540cf12bc8156d9.jpg'
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
            url:
              '/images/avatars/avatar_1564830879626_5d456a7de559a623484395d7.jpg'
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
            url:
              '/images/avatars/avatar_1564830879626_5d456a7de559a623484395d7.jpg'
          }
        }
      }
    ]
  },
  {
    id: '5d4a876f9540cf12bc8156e2',
    body: 'dsfsdfsd',
    createdAt: '1565165423285',
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
        url:
          '/images/avatars/avatar_1565167540853_5d4a86229540cf12bc8156d9.jpg'
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
        id: '5d4a87789540cf12bc8156e5',
        body: 'dsfsdfsd',
        createdAt: '1565165432204',
        createdBy: {
          id: '5d4a86229540cf12bc8156d9',
          fname: 'chandler',
          lname: 'gadol',
          avatar: {
            url:
              '/images/avatars/avatar_1565167540853_5d4a86229540cf12bc8156d9.jpg'
          }
        }
      }
    ]
  },
  {
    id: '5d49ee37c378b10954ac72a8',
    body: 'dfgdfgfdddfdddd',
    createdAt: '1565126199000',
    likes: [
      {
        id: '5d46832e6074102470f01f62'
      },
      {
        id: '5d4a75ac1d6637208018cf13'
      },
      {
        id: '5d4a80911d6637208018cf61'
      },
      {
        id: '5d4a86229540cf12bc8156d9'
      }
    ],
    createdBy: {
      id: '5d46832e6074102470f01f62',
      fname: 'test3',
      lname: 'test3',
      username: 'test3',
      avatar: {
        url:
          '/images/avatars/avatar_1565107450998_5d46832e6074102470f01f62.jpg'
      },
      posts: [
        {
          id: '5d49ee37c378b10954ac72a8'
        },
        {
          id: '5d49b6595cfef92148bae6d4'
        },
        {
          id: '5d49a7ec5cfef92148bae6b2'
        },
        {
          id: '5d49a2635cfef92148bae69f'
        },
        {
          id: '5d49a2505cfef92148bae69c'
        }
      ],
      following: [
        {
          id: '5d4683f76074102470f01f6d'
        },
        {
          id: '5d45c1fd1e602f28608948e1'
        }
      ],
      followers: [
        {
          id: '5d4a86229540cf12bc8156d9'
        },
        {
          id: '5d4a80911d6637208018cf61'
        },
        {
          id: '5d4a7caa1d6637208018cf4d'
        },
        {
          id: '5d4a7bb61d6637208018cf46'
        },
        {
          id: '5d4a7a651d6637208018cf37'
        },
        {
          id: '5d4a784a1d6637208018cf20'
        },
        {
          id: '5d4a77e71d6637208018cf1d'
        },
        {
          id: '5d4a75ac1d6637208018cf13'
        },
        {
          id: '5d4a72e71d6637208018cf05'
        },
        {
          id: '5d4a727b1d6637208018cef4'
        }
      ]
    },
    comments: [
      {
        id: '5d4a8fc69540cf12bc81570e',
        body: 'fdgfdgfdgfd',
        createdAt: '1565167558419',
        createdBy: {
          id: '5d4a86229540cf12bc8156d9',
          fname: 'chandler',
          lname: 'gadol',
          avatar: {
            url:
              '/images/avatars/avatar_1565167540853_5d4a86229540cf12bc8156d9.jpg'
          }
        }
      }
    ]
  },
  {
    id: '5d49b6595cfef92148bae6d4',
    body: 'gfhfhf',
    createdAt: '1565111897459',
    likes: [
      {
        id: '5d46832e6074102470f01f62'
      },
      {
        id: '5d4a80911d6637208018cf61'
      }
    ],
    createdBy: {
      id: '5d46832e6074102470f01f62',
      fname: 'test3',
      lname: 'test3',
      username: 'test3',
      avatar: {
        url:
          '/images/avatars/avatar_1565107450998_5d46832e6074102470f01f62.jpg'
      },
      posts: [
        {
          id: '5d49ee37c378b10954ac72a8'
        },
        {
          id: '5d49b6595cfef92148bae6d4'
        },
        {
          id: '5d49a7ec5cfef92148bae6b2'
        },
        {
          id: '5d49a2635cfef92148bae69f'
        },
        {
          id: '5d49a2505cfef92148bae69c'
        }
      ],
      following: [
        {
          id: '5d4683f76074102470f01f6d'
        },
        {
          id: '5d45c1fd1e602f28608948e1'
        }
      ],
      followers: [
        {
          id: '5d4a86229540cf12bc8156d9'
        },
        {
          id: '5d4a80911d6637208018cf61'
        },
        {
          id: '5d4a7caa1d6637208018cf4d'
        },
        {
          id: '5d4a7bb61d6637208018cf46'
        },
        {
          id: '5d4a7a651d6637208018cf37'
        },
        {
          id: '5d4a784a1d6637208018cf20'
        },
        {
          id: '5d4a77e71d6637208018cf1d'
        },
        {
          id: '5d4a75ac1d6637208018cf13'
        },
        {
          id: '5d4a72e71d6637208018cf05'
        },
        {
          id: '5d4a727b1d6637208018cef4'
        }
      ]
    },
    comments: []
  }
]

export const FETCH_FEED_MOCK = [
  {
    request: {
      query: FETCH_FEED,
      variables: { limit: 5, skip: 0 }
    },
    result: {
      data: { getPosts }
    }
  }
]
