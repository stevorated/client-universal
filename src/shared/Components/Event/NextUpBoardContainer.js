import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { connect } from 'react-redux'
import { FETCH_MY_NEXT_EVENTS } from '../../Store/Apollo/Queries'
import { Loading } from '..'
import { fetchMyNextEvents } from '../../Store/actions'
import EventTable from './EventTable'

function NextUpBoardContainer(props) {  
  // console.log(props)
  return (
    <Query
      // fetchPolicy='network-only' // IMPORTANT
      fetchPolicy='cache-and-network'
      query={FETCH_MY_NEXT_EVENTS}
      variables={{ limit: 5, skip: 0, followed: true }}
      // onCompleted={
      //   ({ getMyEvents }) => {
      //     // props.handleAction('fetchMyNextEvents', { data: getMyEvents })
      //     // props.fetchMyNextEvents(getMyEvents)
      //   }
      // }
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <Loading customLoader="true" size="1" margin="1" />
        if (error) return <Loading customLoader="true" size="1" margin="1" />
        return <EventTable handleAction={props.handleAction} myId={props.myId} events={data.getMyEvents} />
      }}
    </Query>
  )
}

export default NextUpBoardContainer
