import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { fetchFirstNotifications } from '../../Store/actions'
import { Loading } from '..'
import { GET_NOTIFICATIONS } from '../../Store/Apollo/Queries'
import styled from 'styled-components'

const LiveNotification = props => {
  return (
    <Query
      // fetchPolicy='network-only' // IMPORTANT
      query={GET_NOTIFICATIONS}
      variables={{ limit: 1, skip: 0 }}
      pollInterval={5000}
      onCompleted={({ getLastNotifications }) => {
        props.handleAction('fetchFirstNotifications', {
          data: getLastNotifications,
          count: props.myNotifications.length
        })
      }}
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <Loading />
        if (error) return <Loading />
        return <Fragment />
      }}
    </Query>
  )
}

export default LiveNotification
