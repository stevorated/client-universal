import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { connect } from 'react-redux'
import { Table } from 'reactstrap'
import EventTableItems from './EventTableItems'
import { FETCH_MY_NEXT_EVENTS } from '../../Store/Apollo/Queries'
import { Loading } from '..'
import { fetchMyNextEvents } from '../../Store/actions'
import EventTable from './EventTable'

function NextUpBoardContainer(props) {  
  return (
    <Query
      // fetchPolicy='network-only' // IMPORTANT
      query={FETCH_MY_NEXT_EVENTS}
      variables={{ limit: 5, skip: 0 }}
      onCompleted={
        ({ getMyEvents }) => {
          props.fetchMyNextEvents(getMyEvents)
        }
      }
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <Loading size="1" margin="1" />
        if (error) return <Loading size="1" margin="1" />
        return <EventTable events={data.getMyEvents} />
      }}
    </Query>
  )
}



const mapStateToProps = ({ events, myEvents, nextBoardEvents }) => {
  return { events, myEvents, nextBoardEvents }
}

export default connect(mapStateToProps, { fetchMyNextEvents })(NextUpBoardContainer)
