import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { connect } from 'react-redux'
import { FETCH_MY_NEXT_EVENTS } from '../../Store/Apollo/Queries'
import { Loading } from '..'
import { fetchMyNextEvents } from '../../Store/actions'
import EventTable from './EventTable'

function NextUpBoardContainerSide(props) {
  const variables = props.suggested
    ? { limit: 5, skip: 0, suggested: true }
    : { limit: 5, skip: 0, past: true }
  return (
    <Query
      fetchPolicy="cache-and-network"
      query={FETCH_MY_NEXT_EVENTS}
      variables={variables}
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <Loading size="1" margin="1" />
        if (error) return <Loading size="1" margin="1" />
        return <EventTable handleAction={props.handleAction} events={data.getMyEvents} />
      }}
    </Query>
  )
}

export default NextUpBoardContainerSide
