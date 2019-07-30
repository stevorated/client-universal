import gql from 'graphql-tag'

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

