import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { fetchEvent } from '../../Store/actions'
import { Loading } from '..'
import { FETCH_EVENTS } from '../../Store/Apollo/Queries'
import styled from 'styled-components'
import EventDetails from './EventDetails'
import EventGoing from './EventGoing'
import EventCardFeed from './EventCardFeed'
const EventDetailsQuery = (props) => {
  return (
    <Query
      // fetchPolicy='network-only' // IMPORTANT
      query={FETCH_EVENTS}
      variables={{id: props.id}}
      onCompleted={
        ({ getEventsFeed }) => {
          props.handleAction('fetchEvent', { data: getEventsFeed })
        }
      }
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <Loading />
        if (error) return <Loading />
        const { id } = data.getEventsFeed[0]
      
        return (
          <StyledDiv className="text-center">
            <EventDetails handleAction={props.handleAction} myId={props.myId} data={data.getEventsFeed[0]} />
            <EventGoing myId={props.myId} data={data.getEventsFeed[0]} />
            {/* <EventCardFeed /> */}
          </StyledDiv>
        )
      }}
    </Query>
  )
}

export default EventDetailsQuery

const StyledDiv = styled.div `
  margin: 0;
  padding: 0;
  display: block;
`
