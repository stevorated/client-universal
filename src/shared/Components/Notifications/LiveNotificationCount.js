import React, { Fragment } from "react"
import { connect } from "react-redux"
import { Query } from "react-apollo"
import { countNewNotifications } from "../../Store/actions"
import { Loading } from ".."
import { GET_NOTIFICATION_ARRAY } from "../../Store/Apollo/Queries"
import styled from "styled-components"


const LiveNotificationCount = props => {
  return (
    <Query
      // fetchPolicy='network-only' // IMPORTANT
      query={GET_NOTIFICATION_ARRAY}
      variables={{ limit: 10, skip: 0 }}
      pollInterval={5000}
      onCompleted={({ getNotificationsCount }) => {
        props.countNewNotifications(getNotificationsCount, props.auth.seen)
      }}
    >
      {({ loading, error, data, fetchMore }) => {
        if(error) return <Fragment />
        if(loading) return <Fragment />
        return <Fragment />
      }}
    </Query>
  )
}

const mapStateToProps = ({ myNotifications, auth }) => {
  return { myNotifications, auth }
}

export default connect(mapStateToProps,{ countNewNotifications })(LiveNotificationCount)
