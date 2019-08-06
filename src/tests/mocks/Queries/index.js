import { FETCH_FEED } from "../../../shared/Store/Apollo/Queries"

export const FETCH_FEED_MOCK = [
  {
    request: {
      query: FETCH_FEED,
      variables: { limit: 5, skip: 0 }
    },
    result: {
      data: {
        getPosts: [
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
                url: "/images/avatars/avatar_1564905435510_5d4683f76074102470f01f6d.jpg"
              },
              posts: [
                { id: "5d48303d666dba4b7467531b" },
                { id: "5d48303b666dba4b74675319" },
                { id: "5d483039666dba4b74675317" },
                { id: "5d483037666dba4b74675315" }
              ],
              following: [
                { id: "5d46816f6074102470f01f5b" },
                { id: "5d45c1fd1e602f28608948e1" }
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
                url: "/images/avatars/avatar_1564905435510_5d4683f76074102470f01f6d.jpg"
              },
              posts: [
                { id: "5d48303d666dba4b7467531b" },
                { id: "5d48303b666dba4b74675319" },
                { id: "5d483039666dba4b74675317" },
                { id: "5d483037666dba4b74675315" }
              ],
              following: [
                { id: "5d46816f6074102470f01f5b" },
                { id: "5d45c1fd1e602f28608948e1" }
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
                url: "/images/avatars/avatar_1564905435510_5d4683f76074102470f01f6d.jpg"
              },
              posts: [
                { id: "5d48303d666dba4b7467531b" },
                { id: "5d48303b666dba4b74675319" },
                { id: "5d483039666dba4b74675317" },
                { id: "5d483037666dba4b74675315" }
              ],
              following: [
                { id: "5d46816f6074102470f01f5b" },
                { id: "5d45c1fd1e602f28608948e1" }
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
                url: "/images/avatars/avatar_1564905435510_5d4683f76074102470f01f6d.jpg"
              },
              posts: [
                { id: "5d48303d666dba4b7467531b" },
                { id: "5d48303b666dba4b74675319" },
                { id: "5d483039666dba4b74675317" },
                { id: "5d483037666dba4b74675315" }
              ],
              following: [
                { id: "5d46816f6074102470f01f5b" },
                { id: "5d45c1fd1e602f28608948e1" }
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
              { id: "5d45c1fd1e602f28608948e1" },
              { id: "5d45c2f01e602f28608948e3" },
              { id: "5d456a7de559a623484395d7" },
              { id: "5d46816f6074102470f01f5b" },
              { id: "5d4683a06074102470f01f65" },
              { id: "5d4683f76074102470f01f6d" }
            ],
            "createdBy": {
              id: "5d45c1fd1e602f28608948e1",
              fname: "moshe",
              lname: "moshe",
              username: "moshe",
              avatar: null,
              posts: [{ "id": "5d45e617d428a6393c864da0" }],
              following: [{ "id": "5d45c2f01e602f28608948e3" }],
              followers: [
                { id: "5d4683f76074102470f01f6d" },
                { id: "5d45c2f01e602f28608948e3" },
                { id: "5d456a7de559a623484395d7" }
            ]
           },
            comments: []
          }
        ]
      }
    }
  }
]
