import React from 'react'
import { Query } from 'react-apollo'
import { Button } from 'reactstrap'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroller'
import { Loading } from '..'
import { FETCH_USER_EVENTS } from '../../Store/Apollo/Queries'
import { Events } from '..'
import { FlatCardStatic } from '../../Elements'
import { orange } from '../../Utils'

const ProfileEventContainer = props => {
  // console.log(props)
  return (
    <Query
      query={FETCH_USER_EVENTS}
      variables={{ limit: 12, skip: 0, id: props.id }}
      onCompleted={({ getUsersEvents }) => {
        // console.log(getUsersEvents)
        if (!props.events.length) {
          props.handleAction('fetchUserEventsAction', {
            data: getUsersEvents,
            count: props.events.length
          })
          // props.fetchEvents(getEventsFeed, props.events.length)
        }
      }}
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <Loading margin="1" />
        const handleFetchMore = () => {
          fetchMore({
            variables: {
              id: props.id,
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
                    customLoader="true"
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

export default ProfileEventContainer
