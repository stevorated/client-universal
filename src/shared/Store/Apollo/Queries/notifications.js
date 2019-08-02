
import gql from 'graphql-tag'

export const GET_NOTIFICATIONS = gql`
  query getLastNotifications ($limit: Int, $skip: Int){
  getLastNotifications (limit: $limit, skip: $skip) {
    id
    originId
    createdAt
    type
    lastAction
    from {
      id
      fname
      lname
    }
    to {
      id
      fname
      lname
    }
    post {
      id
      body
    }
    comment {
      id
      body
    }
    event {
      id
      name
    }
    unread
    show
  }
}
`

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