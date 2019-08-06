import React from "react"
import { Button } from "reactstrap"
import { Query } from "react-apollo"
import { Loading } from ".."
import { FETCH_MY_EVENTS } from "../../Store/Apollo/Queries"
import styled from "styled-components"
import { Events } from ".."
import { FlatCardStatic } from "../../Elements"
import { orange } from "../../Utils"
const EventBoard = props => {
  return (
    <Query
      query={FETCH_MY_EVENTS}
      variables={{ limit: 6, skip: 0 }}
      onCompleted={({ getMyEventsFeed }) => {
        if (!props.events.length) {
          props.fetchMyEvents(getMyEventsFeed, props.events.length)
        }
      }}
    >
      {({ loading, error, data, fetchMore }) => {
        const handleFatchMore = () => {
          fetchMore({
            variables: {
              skip: props.events.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev
              props.fetchMyEvents([...fetchMoreResult.getMyEventsFeed])
            }
          })
        }
        if (loading) return <Loading />
        if (error) return <Loading />
        return (
          <FlatCardStatic className="mt-3 animated fadeIn slow">
            <p
              className="text-left lead mt-4 mb-0 mx-3"
              style={{ fontWeight: "900" }}
            >
              All Of Your Events
            </p>
            <hr
              className="noPadding mx-3"
              style={{
                color: orange,
                borderWidth: "2px",
                borderColor: orange,
                opacity: "0.5"
              }}
            />
            <Events events={props.events} />
            <Button
              size="sm"
              className="my-5 btn-mainclr"
              onClick={handleFatchMore}
            >
              Load More
            </Button>
          </FlatCardStatic>
        )
      }}
    </Query>
  )
}

export default EventBoard

const StyledDiv = styled.div`
  margin: 0;
  padding: 0;
  display: block;
`
