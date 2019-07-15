import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { fetchMyEvents } from '../../Store/actions'
import { Loading } from '..'
import { FETCH_MY_EVENTS } from '../../Apollo/Queries'
import styled from 'styled-components'
import { Events } from '..'

const MyEventsBoard = (props) => {
  return (
    <Query
      // fetchPolicy='network-only' // IMPORTANT
      query={FETCH_MY_EVENTS}
      variables={{ limit: 6, skip: 0}}
      onCompleted={
        ({ getMyEvents }) => {
          props.fetchMyEvents(getMyEvents, props.myEvents.length )
        }
      }
    // refetchQueries={[{query:GET_MA_POSTS, variables:{limit: 10, skip: 0 }}]}
    >
      {({ loading, error, data, fetchMore }) => {
        const handleFatchMore = () => {
          fetchMore({
            variables: {
              skip: props.myEvents.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev
              props.fetchMyEvents(
                [...fetchMoreResult.getMyEvents]
              ) 
            }
        })}
        if (loading) return <Loading />
        if (error) return <Loading />
        return (
          <StyledDiv className="text-center">
            <Events myEventsMode />
            <Button className="mb-5" onClick={handleFatchMore}>Load More</Button>
          </StyledDiv>
        )
      }}
    </Query>
  )
}

const mapStateToProps = ({ myEvents }) => {
  return { myEvents }
}

export default connect(mapStateToProps, { fetchMyEvents })(MyEventsBoard)

const StyledDiv = styled.div `
  margin: 0;
  padding: 0;
  display: block;
`


