export const initialStateFeedPage = {
  createPost: jest.fn(),
  likePostAction: jest.fn(),
  fetchFeed: jest.fn(),
  auth: {
    id: "5d4683f76074102470f01f6d",
    email: "test@email.com",
    fname: "moshe",
    lname: "testik",
    username: "mosheTestik",
    avatar: {
      url: "/images/avatars/avatar_1564905435510_5d4683f76074102470f01f6d.jpg"
    },
    posts: [
      { id: "5d4890fe666dba4b74675323" },
      { id: "5d4890fe666dba4b74675324" },
      { id: "5d4890fe666dba4b74675325" },
      { id: "5d4890fe666dba4b74675326" }
    ],
    folowing: [
      { id: "5d48303d666dba4b7467531b" },
      { id: "5d48303d666dba4b7467531c" },
      { id: "5d48303d666dba4b7467531d" },
      { id: "5d48303d666dba4b7467531f" }
    ],
    followers: [{ id: "5d48303d666dba4b7467531b" }],
    seen: [
      { id: "5d4683ac6074102470f01f68" },
      { id: "5d4683ac6074102470f01f61" },
      { id: "5d4683ac6074102470f01f62" },
      { id: "5d4683ac6074102470f01f63" },
      { id: "5d4683ac6074102470f01f64" }
    ]
  },

  feed: [
    {
      id: "5d4890fe666dba4b74675323",
      body: "dfsfsd",
      createdAt: "1565036798926",
      likes: [],
      createdBy: {
        id: "5d4683f76074102470f01f6d",
        fname: "test6",
        lname: "test6",
        username: "test6",
        avatar: {
          url:
            "/images/avatars/avatar_1564905435510_5d4683f76074102470f01f6d.jpg"
        },
        posts: [
          {
            id: "5d4890fe666dba4b74675323"
          },
          {
            id: "5d48303d666dba4b7467531b"
          },
          {
            id: "5d48303b666dba4b74675319"
          },
          {
            id: "5d483039666dba4b74675317"
          },
          {
            id: "5d483037666dba4b74675315"
          }
        ],
        following: [
          {
            id: "5d46816f6074102470f01f5b"
          },
          {
            id: "5d45c2f01e602f28608948e3"
          },
          {
            id: "5d45c1fd1e602f28608948e1"
          }
        ],
        followers: []
      },
      comments: []
    },
    {
      id: "5d48303d666dba4b7467531b",
      body: "sdfdsfds",
      createdAt: "1565012029640",
      likes: [],
      createdBy: {
        id: "5d4683f76074102470f01f6d",
        fname: "test6",
        lname: "test6",
        username: "test6",
        avatar: {
          url:
            "/images/avatars/avatar_1564905435510_5d4683f76074102470f01f6d.jpg"
        },
        posts: [
          {
            id: "5d4890fe666dba4b74675323"
          },
          {
            id: "5d48303d666dba4b7467531b"
          },
          {
            id: "5d48303b666dba4b74675319"
          },
          {
            id: "5d483039666dba4b74675317"
          },
          {
            id: "5d483037666dba4b74675315"
          }
        ],
        following: [
          {
            id: "5d46816f6074102470f01f5b"
          },
          {
            id: "5d45c2f01e602f28608948e3"
          },
          {
            id: "5d45c1fd1e602f28608948e1"
          }
        ],
        followers: []
      },
      comments: []
    },
    {
      id: "5d48303b666dba4b74675319",
      body: "sdfdsdsf",
      createdAt: "1565012027832",
      likes: [],
      createdBy: {
        id: "5d4683f76074102470f01f6d",
        fname: "test6",
        lname: "test6",
        username: "test6",
        avatar: {
          url:
            "/images/avatars/avatar_1564905435510_5d4683f76074102470f01f6d.jpg"
        },
        posts: [
          {
            id: "5d4890fe666dba4b74675323"
          },
          {
            id: "5d48303d666dba4b7467531b"
          },
          {
            id: "5d48303b666dba4b74675319"
          },
          {
            id: "5d483039666dba4b74675317"
          },
          {
            id: "5d483037666dba4b74675315"
          }
        ],
        following: [
          {
            id: "5d46816f6074102470f01f5b"
          },
          {
            id: "5d45c2f01e602f28608948e3"
          },
          {
            id: "5d45c1fd1e602f28608948e1"
          }
        ],
        followers: []
      },
      comments: []
    },
    {
      id: "5d483039666dba4b74675317",
      body: "dsfdsfds",
      createdAt: "1565012025928",
      likes: [],
      createdBy: {
        id: "5d4683f76074102470f01f6d",
        fname: "test6",
        lname: "test6",
        username: "test6",
        avatar: {
          url:
            "/images/avatars/avatar_1564905435510_5d4683f76074102470f01f6d.jpg"
        },
        posts: [
          {
            id: "5d4890fe666dba4b74675323"
          },
          {
            id: "5d48303d666dba4b7467531b"
          },
          {
            id: "5d48303b666dba4b74675319"
          },
          {
            id: "5d483039666dba4b74675317"
          },
          {
            id: "5d483037666dba4b74675315"
          }
        ],
        following: [
          {
            id: "5d46816f6074102470f01f5b"
          },
          {
            id: "5d45c2f01e602f28608948e3"
          },
          {
            id: "5d45c1fd1e602f28608948e1"
          }
        ],
        followers: []
      },
      comments: []
    },
    {
      id: "5d483037666dba4b74675315",
      body: "dsfdsfsd",
      createdAt: "1565012023725",
      likes: [],
      createdBy: {
        id: "5d4683f76074102470f01f6d",
        fname: "test6",
        lname: "test6",
        username: "test6",
        avatar: {
          url:
            "/images/avatars/avatar_1564905435510_5d4683f76074102470f01f6d.jpg"
        },
        posts: [
          {
            id: "5d4890fe666dba4b74675323"
          },
          {
            id: "5d48303d666dba4b7467531b"
          },
          {
            id: "5d48303b666dba4b74675319"
          },
          {
            id: "5d483039666dba4b74675317"
          },
          {
            id: "5d483037666dba4b74675315"
          }
        ],
        following: [
          {
            id: "5d46816f6074102470f01f5b"
          },
          {
            id: "5d45c2f01e602f28608948e3"
          },
          {
            id: "5d45c1fd1e602f28608948e1"
          }
        ],
        followers: []
      },
      comments: []
    },
    {
      id: "5d45e617d428a6393c864da0",
      body: "sdfsdfsdfsd",
      createdAt: "1564861975421",
      likes: [
        {
          id: "5d45c1fd1e602f28608948e1"
        },
        {
          id: "5d45c2f01e602f28608948e3"
        },
        {
          id: "5d456a7de559a623484395d7"
        },
        {
          id: "5d46816f6074102470f01f5b"
        },
        {
          id: "5d4683a06074102470f01f65"
        }
      ],
      createdBy: {
        id: "5d45c1fd1e602f28608948e1",
        fname: "moshe",
        lname: "moshe",
        username: "moshe",
        avatar: null,
        posts: [
          {
            id: "5d45e617d428a6393c864da0"
          }
        ],
        following: [
          {
            id: "5d45c2f01e602f28608948e3"
          }
        ],
        followers: [
          {
            id: "5d4683f76074102470f01f6d"
          },
          {
            id: "5d45c2f01e602f28608948e3"
          },
          {
            id: "5d456a7de559a623484395d7"
          }
        ]
      },
      comments: [
        {
          id: "5d489ff9666dba4b7467532b",
          body: "sdfdsfds",
          createdAt: "1565040633439",
          createdBy: {
            id: "5d4683f76074102470f01f6d",
            fname: "test6",
            lname: "test6",
            avatar: {
              url:
                "/images/avatars/avatar_1564905435510_5d4683f76074102470f01f6d.jpg"
            }
          }
        }
      ]
    },
    {
      id: "5d45d3141e602f28608948e5",
      body: "dsfdsfdsfds",
      createdAt: "1564857108636",
      likes: [
        {
          id: "5d45c1fd1e602f28608948e1"
        },
        {
          id: "5d4683f76074102470f01f6d"
        }
      ],
      createdBy: {
        id: "5d45c2f01e602f28608948e3",
        fname: "igi",
        lname: "vaxman",
        username: "vaxman",
        avatar: null,
        posts: [
          {
            id: "5d45d3141e602f28608948e5"
          }
        ],
        following: [
          {
            id: "5d45c1fd1e602f28608948e1"
          }
        ],
        followers: [
          {
            id: "5d4683f76074102470f01f6d"
          },
          {
            id: "5d45c1fd1e602f28608948e1"
          }
        ]
      },
      comments: []
    },
    {
      id: "5d456c88c516ea311ce69e1a",
      body: "BLI BLI",
      createdAt: "1564830856620",
      likes: [
        {
          id: "5d456b83c516ea311ce69e14"
        },
        {
          id: "5d45c2f01e602f28608948e3"
        }
      ],
      createdBy: {
        id: "5d456b83c516ea311ce69e14",
        fname: "moshe",
        lname: "ufnik",
        username: "mosheufnik",
        avatar: null,
        posts: [
          {
            id: "5d456c88c516ea311ce69e1a"
          },
          {
            id: "5d456b94c516ea311ce69e16"
          }
        ],
        following: [],
        followers: []
      },
      comments: []
    },
    {
      id: "5d456b94c516ea311ce69e16",
      body: "bla bla bla",
      createdAt: "1564830612465",
      likes: [
        {
          id: "5d456a7de559a623484395d7"
        },
        {
          id: "5d456b83c516ea311ce69e14"
        },
        {
          id: "5d45c1fd1e602f28608948e1"
        }
      ],
      createdBy: {
        id: "5d456b83c516ea311ce69e14",
        fname: "moshe",
        lname: "ufnik",
        username: "mosheufnik",
        avatar: null,
        posts: [
          {
            id: "5d456c88c516ea311ce69e1a"
          },
          {
            id: "5d456b94c516ea311ce69e16"
          }
        ],
        following: [],
        followers: []
      },
      comments: []
    }
  ]
}