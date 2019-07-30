import gql from 'graphql-tag'

//  ========== FEED ===========
export const FETCH_FEED = gql`
query getFeed ($limit: Int, $skip: Int, $id: ID) {
  getPosts(limit: $limit, skip: $skip, id: $id) {
    id
    body
    createdAt
    likes {
      id
    }
    createdBy {
      id
      fname
      lname
      username
      avatar {
        url
      }
      posts {
        id
      }
      following {
      id
      }
      followers {
        id
      }
    }
    comments {
      id
      body
      createdAt
      createdBy {
        id
        fname
        lname
        avatar {
          url
        }
      }
    }
  }
}
`

//  ======== MY POSTS ===============

export const FETCH_MORE_POSTS = gql`
query( $limit: Int, $skip: Int ){
  getMyPosts (limit: $limit, skip: $skip) {
    id
    body
    createdAt
    likes {
      id
    }
    createdBy {
      id
      fname
      lname
      username
      avatar {
        url
      }
      
      posts {
        id
      }
      following {
      id
      }
      followers {
        id
      }
    }
    comments {
      id
      body
      createdAt
      createdBy {
        id
        fname
        lname
        avatar {
          url
        }
      }
    }
  }
}
`


export const GET_MA_POSTS = gql`
query ($limit: Int, $skip: Int){
  getMyPosts (limit: $limit, skip: $skip) {
    id
    body
    createdAt
    likes {
      id
    }
    createdBy {
      id
      fname
      lname
      username
      avatar {
        url
      }
      posts {
        id
      }
      following {
      id
      }
      followers {
        id
      }
    }
    comments {
      id
      body
      createdAt
      createdBy {
        id
        fname
        lname
        avatar {
          url
        }
      }
    }
  }
}
`

//  ================== USER's POSTS ======================