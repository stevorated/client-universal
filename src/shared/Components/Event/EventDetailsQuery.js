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

const EventDetailsQuery = (props) => {
  return (
    <Query
      // fetchPolicy='network-only' // IMPORTANT
      query={FETCH_EVENTS}
      variables={{id: props.id}}
      onCompleted={
        ({ getEvents }) => {
          props.fetchEvent(getEvents)
        }
      }
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <Loading />
        if (error) return <Loading />
        const { id } = data.getEvents[0]
      
        return (
          <StyledDiv className="text-center">
            <EventDetails data={data.getEvents[0]} />
          </StyledDiv>
        )
      }}
    </Query>
  )
}

const mapStateToProps = ({ event }) => {
  return { event }
}

export default connect(mapStateToProps, { fetchEvent })(EventDetailsQuery)

const StyledDiv = styled.div `
  margin: 0;
  padding: 0;
  display: block;
`


