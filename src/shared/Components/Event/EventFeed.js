import React from 'react'
import { Query } from 'react-apollo'
import { Button } from 'reactstrap'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroller'
import { Loading } from '..'
import { FETCH_EVENTS } from '../../Store/Apollo/Queries'
import { Events } from '..'
import { FlatCardStatic } from '../../Elements'
import { orange } from '../../Utils'

const EventFeed = props => {
  return (
    <Query
      query={FETCH_EVENTS}
      variables={{ limit: 12, skip: 0 }}
      onCompleted={({ getEventsFeed }) => {
        if (!props.events.length) {
          props.handleAction('fetchEvents', {
            data: getEventsFeed,
            count: props.events.length
          })
          // props.fetchEvents(getEventsFeed, props.events.length)
        }
      }}
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <Loading />
        const handleFetchMore = () => {
          fetchMore({
            variables: {
              skip: props.events.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult.getEventsFeed.length) return props.setLoadMore(false)
              // props.fetchEvents([...fetchMoreResult.getEventsFeed])
              setTimeout(()=> {
                props.handleAction('fetchEvents', {
                data: [...fetchMoreResult.getEventsFeed]
              })
              }, 100)
              
            }
          })
        }

        if (error) return <Loading />
        return (
          <FlatCardStatic className="mt-3 animated fadeIn slow">
            <p
              className="text-left lead mt-4 mb-0 mx-3"
              style={{ fontWeight: '900' }}
            >
              All Of the Events
            </p>
            <hr
              className="noPadding mx-3"
              style={{
                color: orange,
                borderWidth: '2px',
                borderColor: orange,
                opacity: '0.5'
              }}
            />
            <Events
              handleAction={props.handleAction}
              myId={props.myId}
              eventFeedMode
              events={props.events}
            />

            {props.loadMore && props.events.length === 6 && (
              <InfiniteScroll
                children={[]}
                pageStart={0}
                loadMore={handleFetchMore}
                hasMore={true}
                loader={
                  <Loading
                    margin="1"
                    key={`${Date.now()}-loading-infinite-profile`}
                  />
                }
              />
            )}
          </FlatCardStatic>
        )
      }}
    </Query>
  )
}

export default EventFeed
