import React from 'react'
import { Query } from 'react-apollo'
import InfiniteScroll from 'react-infinite-scroller'

import { Loading } from '../'
import { FlatCardStatic } from '../../Elements'
import { GET_NOTIFICATIONS } from '../../Store/Apollo/Queries'
import styled from 'styled-components'
import Notifications from './Notifications'
import { orange } from '../../Utils'

const NotificationsContainer = props => {
  return (
    <Query
      // fetchPolicy='network-only' // IMPORTANT
      query={GET_NOTIFICATIONS}
      variables={{ limit: 9, skip: 1 }}
      onCompleted={({ getLastNotifications }) => {
        const existing = props.myNotifications.map(post => post.id)
        const diff = getLastNotifications.filter(
          post => !existing.includes(post.id)
        )
        props.handleAction('fetchMyNotifications', {
          data: diff,
          count: props.myNotifications.length
        })
      }}
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <Loading />
        const handlefetchMore = async () => {
          await fetchMore({
            variables: {
              skip: props.myNotifications.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult.getLastNotifications.length) {
                return props.setLoadMore(false)
              }

              return props.handleAction('fetchMyNotifications', {
                data: [...fetchMoreResult.getLastNotifications]
              })
            }
          })
        }
        if (error) return null
        return (
          <StyledDiv className="text-center">
            <FlatCardStatic className="" style={{ minHeight: '100vh' }}>
              <div
                className="text-left lead mb-0 mt-lg-4 mt-3"
                style={{ fontWeight: '900' }}
              >
                Notifications
              </div>
              <hr
                className="noPadding"
                style={{
                  color: orange,
                  borderWidth: '2px',
                  borderColor: orange,
                  opacity: '0.5'
                }}
              />

              <Notifications
                loading={loading}
                handleAction={props.handleAction}
                myNotifications={props.myNotifications}
                myId={props.myId}
                seen={props.seen}
              />
              {props.myNotifications.length >= 10 && props.loadMore && (
                <InfiniteScroll
                  children={[]}
                  pageStart={0}
                  loadMore={handlefetchMore}
                  hasMore={props.loadMore}
                  loader={
                    <Loading key={`${Date.now()}-loading-infinite-feed`} />
                  }
                />
              )}
            </FlatCardStatic>
          </StyledDiv>
        )
      }}
    </Query>
  )
}

export default NotificationsContainer

const StyledDiv = styled.div`
  margin: 0;
  padding: 0;
`
