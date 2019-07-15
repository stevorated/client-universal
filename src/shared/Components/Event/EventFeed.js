import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { fetchEvents } from '../../Store/actions'
import { Loading } from '..'
import { FETCH_EVENTS } from '../../Apollo/Queries'
import styled from 'styled-components'
import { Events } from '..'
import { FlatCardStatic } from '../../Elements'

const EventFeed = (props) => {
  // const skip = props.events ? 1 : 0
  return (
    <Query
      // fetchPolicy='network-only' // IMPORTANT
      query={FETCH_EVENTS}
      variables={{ limit: 6, skip: 0 }}
      onCompleted={
        ({ getEvents }) => {
          props.fetchEvents(getEvents, props.events.length )
        }
      }
    // refetchQueries={[{query:GET_MA_POSTS, variables:{limit: 10, skip: 0 }}]}
    >
      {({ loading, error, data, fetchMore }) => {
        const handleFatchMore = () => {
          fetchMore({
            variables: {
              skip: props.events.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev
              props.fetchEvents(
                [...fetchMoreResult.getEvents]
              ) 
            }
        })}
        if (loading) return <Loading />
        if (error) return <Loading />
        return (
          <FlatCardStatic className="mt-3 animated fadeIn slow" >
            <Events eventFeedMode />
            <Button className="mb-5" onClick={handleFatchMore}>Load More</Button>
          </FlatCardStatic>
        )
      }}
    </Query>
  )
}

const mapStateToProps = ({ events }) => {
  return { events }
}

export default connect(mapStateToProps, { fetchEvents })(EventFeed)

const StyledDiv = styled.div `
  margin: 0;
  padding: 0;
  display: block;
`


