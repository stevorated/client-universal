import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { fetchMyNotifications } from '../../Store/actions'
import { Posts } from '../Post'
import { Loading } from '../'
import { FlatCardStatic } from '../../Elements'
import { GET_NOTIFICATIONS } from '../../Store/Apollo/Queries'
import { PostFormContainer } from '../Post'
import styled from 'styled-components'
import Notifications from './Notifications'
import { orange } from '../../Utils'
import InfiniteScroll from 'react-infinite-scroller'

const NotificationsContainer = props => {
  return (
    <Query
      // fetchPolicy='network-only' // IMPORTANT
      query={GET_NOTIFICATIONS}
      variables={{ limit: 9, skip: 1 }}
      onCompleted={({ getLastNotifications }) => {
        props.handleAction('fetchMyNotifications', {
          data: getLastNotifications,
          count: props.myNotifications.length
        })
      }}
      // refetchQueries={[{query:GET_MA_POSTS, variables:{limit: 10, skip: 0 }}]}
    >
      {({ loading, error, data, fetchMore }) => {
        const handlefetchMore = () => {
          fetchMore({
            variables: {
              skip: props.myNotifications.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult.getLastNotifications.length) {
                  props.setLoadMore(false)
                }
              props.handleAction('fetchMyNotifications', {
                data: [...fetchMoreResult.getLastNotifications]
              })
            }
          })
        }
        if (loading) return null
        if (error) return <Loading />
        return (
          <StyledDiv className="text-center">
            <FlatCardStatic className="">
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
                handleAction={props.handleAction}
                myNotifications={props.myNotifications}
                myId={props.myId}
                seen={props.seen}
              />
              {props.loadMore && <InfiniteScroll
              children={[]}
              pageStart={0}
              loadMore={handlefetchMore}
              hasMore={props.loadMore}
              loader={
                <Loading key={`${Date.now()}-loading-infinite-feed`} />
              }
            />}
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
