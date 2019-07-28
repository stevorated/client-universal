
import gql from 'graphql-tag'

export const GET_MY_NOTIFICATIONS = gql`
  query getMyNotifications ($limit: Int, $skip: Int){
  getMyNotifications (limit: $limit, skip: $skip ) {
    id
    body
    show
    action
    new
    to {
      id
    }
    from {
      fname
      lname
    }
    event {
      id
      name
    }
    post {
      id
      body
    }
    createdAt
  }
}
`