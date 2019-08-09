import React from "react"
import { Query } from "react-apollo"
import { Button } from "reactstrap"
import styled from "styled-components"

import { Loading } from ".."
import { FETCH_EVENTS } from "../../Store/Apollo/Queries"
import { Events } from ".."
import { FlatCardStatic } from "../../Elements"
import { orange } from "../../Utils"

const EventFeed = props => {
  return (
    <Query
      query={FETCH_EVENTS}
      variables={{ limit: 6, skip: 0 }}
      onCompleted={({ getEventsFeed }) => {
        if (!props.events.length) {
          props.handleAction('fetchEvents', { data: getEventsFeed, count: props.events.length })
          // props.fetchEvents(getEventsFeed, props.events.length)
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
              // props.fetchEvents([...fetchMoreResult.getEventsFeed])
              props.handleAction('fetchEvents', { data: [...fetchMoreResult.getEventsFeed] })
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
              All Of the Events
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
            <Events handleAction={props.handleAction} myId={props.myId} eventFeedMode events={props.events} />
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

export default EventFeed

const StyledDiv = styled.div`
  margin: 0;
  padding: 0;
  display: block;
`
