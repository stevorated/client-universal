import gql from 'graphql-tag'

export const FETCH_CALANDER_EVENTS = gql`
query getMonthsEvents ($month: String, $skip: Int, $limit: Int) {
  getMonthsEvents (month: $month skip: $skip, limit: $limit) {
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
    followers {
      id
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

export const FETCH_MY_NEXT_EVENTS = gql`
query ($skip: Int, $limit: Int, $followed:Boolean, $suggested: Boolean) {
  getMyEvents (skip: $skip, limit: $limit, followed: $followed, suggested: $suggested) {
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
    followers {
      id
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
query ($skip: Int, $limit: Int, $id: ID, $byCreatedAt: Boolean, $byPopular: Boolean) {
  getEvents (skip: $skip, limit: $limit, id:$id, byCreatedAt: $byCreatedAt, byPopular: $byPopular) {
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
    followers {
      id
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
    followers {
      id
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
    followers {
      id
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