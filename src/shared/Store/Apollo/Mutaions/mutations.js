import gql from 'graphql-tag'

export const CHANGE_PASSWORD = gql`
mutation ($password: String!, $newPassword: String!) {
  changePassword (password: $password, newPassword: $newPassword)
}

`

export const RESET_PASSWORD = gql`
mutation ($token: String!, $newPassword: String!) {
  resetPassword (token: $token, newPassword: $newPassword)
}

`

export const START_RESET_PASSWORD = gql`
mutation ($email: String!) {
  startResetPassword (email: $email)
}

`

export const FOLLOW_EVENT_MUT = gql`
  mutation followEvent ($event: ID!) {
    followEvent (event: $event) {
      id
      followersCount
      followers {
        id
      }
    }
  }
`

export const FOLLOW_USER_MUT = gql`
  mutation ($id: ID!) {
    follow (id: $id) {
      id
      followers {
        id
      }
    }
  }
`

export const LIKE_POST_MUT = gql`
  mutation ($id: ID!) {
    likePost (id: $id) {
      likes {
        id
      }
    }
  }
`

export const CREATE_EVENT = gql`
mutation ( 
  $fbId: String,
  $name: String!,
  $description: String,
  $image: Upload!,
  $venue: String!,
  $address: String,
  $artists: [String!]!,
  $startTimestamp: Int,
  $startDate: String!,
  $startTime: String!,
  $endDate: String,
  $endTime: String
 ) {
  createEvent (
  fbId: $fbId,
  name: $name,
  description: $description,
  image: $image,
  venue: $venue,
  address: $address,
  artists: $artists,
  startTimestamp: $startTimestamp
  startDate: $startDate,
  startTime: $startTime,
  endDate: $endDate,
  endTime: $endTime
  ) {
    id
    name
    fbId
    description
    followersCount
    coverPhoto {
      url
    }
    thumbnil {
      url
    }
    venue
    address
    artists
    followers {
      id
    }
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

export const UPLOAD_FILE_TEST = gql`
mutation ($file: Upload!, $size: String!, $asect: Int, $height: Int, $unit: String, $width: Int, $x: Int, $y: Int, $scaleX: Int, $scaleY:Int) {
  singleUpload (file: $file, size: $size, asect: $asect, height: $height, unit: $unit, width: $width, x: $x, y: $y, scaleX: $scaleX, scaleY: $scaleY) {
    url
  }
}
`


export const DELETE_POST_MUT = gql`
mutation ($post: ID!) {
  deletePost (post: $post)
}

`

export const DELETE_COMMENT_MUT = gql`
mutation ($id: ID!) {
  deleteComment (id: $id) {
    id
  }
}

`

export const CREATE_POST_MUT = gql`
    mutation (
	$body: String!
) {
  createPost (body: $body) {
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
      email
      avatar {
        url
      }
      posts {
        id
        likes {
          id
        }
      }
    }
    comments {
      id
      body
      createdAt
      createdBy {
        fname
        lname
      }
      post {
        id
      }
    }
  }
}
`

export const CREATE_COMMENT_MUT = gql`
  mutation (
  $post: String!,
	$body: String!
) {
  createComment (
    body: $body,
    post: $post
  ) {
		id
    body
    post {
      id
    }
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
`



export const UPDATE_MY_PROFILE = gql`
 mutation ($fname: String, $lname: String, $username: String, $bio: String) {
  updateMyProfile (
    fname: $fname,
    lname: $lname,
    username: $username,
    bio: $bio
  ) {
    id
    email
    fname
    lname
    username
    email_confirmed
    avatar {
      url
    }
    likes {
      id
    }
    events {
      id
      followersCount
      followers {
        id
        
      }
    }
    followingEvents {
      id
    }
    posts {
      id
      likes {
        id
      }
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

export const REGISTER_USER_MUT = gql`
 mutation ($fname: String!, $lname: String!, $username: String!, $email: String!, $password: String!) {
  signUp (
    fname: $fname,
    lname: $lname,
    username: $username,
    email: $email,
    password: $password
  ) {
    id
    email
    fname
    lname
    username
    email_confirmed
    avatar {
      url
    }
    likes {
      id
    }
    events {
      id
      followersCount
      followers {
        id
        
      }
    }
    followingEvents {
      id
    }
    posts {
      id
      likes {
        id
      }
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

export const LOGIN_USER_MUT = gql`
 mutation ($email: String!, $password: String!) {
  signIn (
    email: $email,
    password: $password
  ) {
    id
    email
    fname
    lname
    username
    email_confirmed
    avatar {
      url
    }
    likes {
      id
    }
    events {
      id
      followersCount
      followers {
        id
        
      }
    }
    followingEvents {
      id
    }
    posts {
      id
      likes {
        id
      }
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
  }
}
`
export const LOGOUT_USER = gql`
  mutation {
    signOut
  }
`