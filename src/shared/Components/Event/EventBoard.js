import React from 'react'
import { Button } from 'reactstrap'
import { Query } from 'react-apollo'
import InfiniteScroll from 'react-infinite-scroller'
import { Loading } from '..'
import { FETCH_MY_EVENTS } from '../../Store/Apollo/Queries'

import styled from 'styled-components'
import { Events } from '..'
import { FlatCardStatic } from '../../Elements'
import { orange } from '../../Utils'

const EventBoard = props => {
  return (
    <Query
      query={FETCH_MY_EVENTS}
      variables={{ limit: 6, skip: 0 }}
      onCompleted={({ getMyEventsFeed }) => {
        if (!props.events.length) {
          props.handleAction('fetchMyEvents', {
            data: getMyEventsFeed,
            count: props.events.length
          })
          // props.fetchMyEvents(getMyEventsFeed, props.events.length)
        }
      }}
    >
      {({ loading, error, data, fetchMore }) => {
        const handleFetchMore = () => {
          fetchMore({
            variables: {
              skip: props.events.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult.getMyEventsFeed.length) return props.setLoadMore(false)
              props.handleAction('fetchMyEvents', {
                data: [...fetchMoreResult.getMyEventsFeed],
                count: props.events.length
              })
              // props.fetchMyEvents([...fetchMoreResult.getMyEventsFeed])
            }
          })
        }
        if (loading) return <Loading />
        if (error) return <Loading />
        return (
          <FlatCardStatic className="mt-3 animated fadeIn slow">
            <p
              className="text-left lead mt-4 mb-0 mx-3"
              style={{ fontWeight: '900' }}
            >
              All Of Your Events
            </p>
            <hr
              className="mx-3"
              style={{
                color: orange,
                borderWidth: '2px',
                borderColor: orange,
                opacity: '0.5'
              }}
            />
            <Events
              handleAction={props.handleAction}
              events={props.events}
              myId={props.myId}
            />
            {props.loadMore && (
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

export default EventBoard
