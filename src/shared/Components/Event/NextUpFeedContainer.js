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
  console.log(props)
  return (
    <Query
      fetchPolicy='network-only' // IMPORTANT
      query={FETCH_NEXT_EVENTS}
      variables={{ limit: 5, skip: 0 }}
      onCompleted={
        ({ getEvents }) => {
          props.fetchNextEvents(getEvents)
        }
      }
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <Loading size="1" margin="1" />
        if (error) return <Loading size="1" margin="1" />
        return (
          <EventTable events={data.getEvents} />
        )
      }}
    </Query>
  )

}

const mapStateToProps = ({ events, myEvents, nextEvents }) => {
  return { events, myEvents, nextEvents }
}

export default connect(mapStateToProps, { fetchNextEvents })(NextUpFeedContainer)
