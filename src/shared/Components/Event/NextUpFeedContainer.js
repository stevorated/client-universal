import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { connect } from 'react-redux'
import { Table } from 'reactstrap'
import EventTableItems from './EventTableItems'
import { FETCH_NEXT_EVENTS } from '../../Store/Apollo/Queries'
import { Loading } from '..'
import { fetchNextEvents } from '../../Store/actions'
import EventTable from './EventTable'

function NextUpFeedContainer (props) {
  return (
    <Query
      // fetchPolicy='network-only' // IMPORTANT
      fetchPolicy='cache-and-network'
      query={FETCH_NEXT_EVENTS}
      variables={{ limit: 5, skip: 0 }}
      // onCompleted={
      //   ({ getEvents }) => {
      //     props.handleAction('fetchNextEvents', { data: getEvents })
      //     // props.fetchNextEvents(getEvents)
      //   }
      // }
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <Loading size="1" margin="1" />
        if (error) return <Loading size="1" margin="1" />
        return (
          <EventTable handleAction={props.handleAction} myId={props.myId} events={data.getEvents} />
        )
      }}
    </Query>
  )

}

export default NextUpFeedContainer
