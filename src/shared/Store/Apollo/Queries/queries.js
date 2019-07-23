import gql from 'graphql-tag'

export const FETCH_MY_NEXT_EVENTS = gql`
query ($skip: Int, $limit: Int) {
  getMyEvents (skip: $skip, limit: $limit) {
    id
    name
    fbId
    description
    coverPhoto {
      url
    }
    thumbnil {
      url
    }
    venue
    address
    artists
    startDate
    startTime
    endDate
    endTime
    createdBy {
      id
      fname
      lname
      avatar {
        url
      }
    }
    createdAt
  }
 }

`
export const FETCH_NEXT_EVENTS = gql`
query ($skip: Int, $limit: Int $id: ID) {
  getEvents (skip: $skip, limit: $limit, id:$id) {
    id
    name
    fbId
    description
    coverPhoto {
      url
    }
    thumbnil {
      url
    }
    venue
    address
    artists
    startDate
    startTime
    endDate
    endTime
    createdBy {
      id
      fname
      lname
      avatar {
        url
      }
    }
    createdAt
  }
 }

`

export const FETCH_EVENTS = gql`
query ($skip: Int, $limit: Int $id: ID) {
  getEventsFeed (skip: $skip, limit: $limit, id:$id) {
    id
    name
    fbId
    description
    coverPhoto {
      url
    }
    thumbnil {
      url
    }
    venue
    address
    artists
    startDate
    startTime
    endDate
    endTime
    createdBy {
      id
      fname
      lname
      avatar {
        url
      }
    }
    createdAt
  }
 }

`

export const FETCH_MY_EVENTS = gql`
query ($skip: Int, $limit: Int, $sort: Int) {
  getMyEventsFeed (skip: $skip, limit: $limit, sort: $sort) {
    id
    name
    fbId
    description
    coverPhoto {
      url
    }
    thumbnil {
      url
    }
    venue
    address
    artists
    startDate
    startTime
    endDate
    endTime
    createdBy {
      id
      fname
      lname
      avatar {
        url
      }
    }
    createdAt
  }
 }

`

export const SEARCH_USER = gql`
query ($fname: String, $lname: String, $username: String){
  searchUsers (filter: {
    fname: $fname
    lname: $lname
    username: $username
  }) {
    id
    email
    fname
    lname
    username
    avatar {
      url
    }
  }
}
`

export const FETCH_USERS_POSTS = gql`
  query getUsersPosts ($id: ID! $limit: Int, $skip: Int) {
  getUsersPosts(id:$id limit:$limit skip:$skip) {
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
      email
      avatar {
        url
      }
      username
      likes {
        id
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

export const GET_ME = gql`
{
  me {
    id
    email
    fname
    lname
    avatar {
      url
    }
    username
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
}
`
export const GET_MA_DETAILS = gql`
{
  me {
    fname
    lname
    username
    email
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
}
`
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

export const FETCH_FEED = gql`
query getFeed ($limit: Int, $skip: Int) {
  getPosts(limit: $limit, skip: $skip) {
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

export const GET_USERS = gql`
{
  users {
    id
    lname
    fname
    username
    email
    avatar {
      url
    }
  }
}
`

