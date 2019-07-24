import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { fetchMyEvents } from '../../Store/actions'
import { Loading } from '..'
import { FETCH_MY_EVENTS } from '../../Store/Apollo/Queries'
import styled from 'styled-components'
import { Events } from '..'
import { FlatCardStatic } from '../../Elements'
import { orange } from '../../Utils'
const EventBoard = (props) => {
  // const skip = props.events ? 1 : 0
  return (
    <Query
      // fetchPolicy='network-only' // IMPORTANT
      query={FETCH_MY_EVENTS}
      variables={{ limit: 6, skip: 0 }}
      onCompleted={
        ({ getMyEventsFeed }) => {
          props.fetchMyEvents(getMyEventsFeed, props.myEvents.length )
        }
      }
    // refetchQueries={[{query:GET_MA_POSTS, variables:{limit: 10, skip: 0 }}]}
    >
      {({ loading, error, data, fetchMore }) => {
        const handleFatchMore = () => {
          console.log(props.myEvents.length)
          fetchMore({
            variables: {
              skip: props.myEvents.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev
              props.fetchMyEvents(
                [...fetchMoreResult.getMyEventsFeed]
              ) 
            }
        })}
        if (loading) return <Loading />
        if (error) return <Loading />
        return (
          <FlatCardStatic className="mt-3 animated fadeIn slow" >
          <p className="text-left lead mt-4 mb-0 mx-3" style={{fontWeight:'900'}}>All Of Your Events</p>
            <hr className="noPadding mx-3" style={{ color: orange, borderWidth: '2px', borderColor: orange, opacity: '0.5' }} />
            <Events myEventsMode />
            <Button size="sm" className="my-5 btn-mainclr" onClick={handleFatchMore}>Load More</Button>
          </FlatCardStatic>
        )
      }}
    </Query>
  )
}

const mapStateToProps = ({ myEvents }) => {
  return { myEvents }
}

export default connect(mapStateToProps, { fetchMyEvents })(EventBoard)

const StyledDiv = styled.div `
  margin: 0;
  padding: 0;
  display: block;
`


