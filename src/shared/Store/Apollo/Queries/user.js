import gql from 'graphql-tag'

export const GET_ME = gql`
{
  me {
    id
    email
    fname
    lname
    username
    email_confirmed
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
    seen {
      id
    }
    bio
  }
}
`
export const GET_MA_DETAILS = gql`
{
  me {
    id
    fname
    lname
    username
    email
    email_confirmed
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
    seen {
      id
    }
    bio
  }
}
`


export const GET_USER = gql`
query user ($id: ID!) {
  user (id: $id) {
    id
    email
    fname
    lname
    username
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
    bio
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