import React, { useState } from 'react'
import { Button } from 'reactstrap'
import { Query } from 'react-apollo'
import { Posts } from '../Post'
import { Loading } from '../'
import { FETCH_FEED } from '../../Store/Apollo/Queries'
import { PostFormContainer } from '../Post'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroller'

const FeedScrollQuery = props => {
  return (
    <Query
      query={FETCH_FEED}
      variables={{ limit: 5, skip: 0 }}
      onCompleted={({ getPosts }) => {
        const existingPosts = props.posts.map((post) => post.id)
        const diff = getPosts.filter(post => !existingPosts.includes(post.id))
        props.handleAction('fetchFeed', {
          data: diff,
          count: props.posts.length
        })
      }}
    >
      {({ loading, error, data, fetchMore }) => {
        const handlefetchMore = () => {
          fetchMore({
            variables: {
              skip: props.posts.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult.getPosts.length) return props.setLoadMore(false)
              props.handleAction('fetchFeed', {
                data: [...fetchMoreResult.getPosts]
              })
            }
          })
        }
        if (loading) return <Loading />
        if (error) return null
        return (
          <StyledDiv className="text-center  mr-lg-4">
            <PostFormContainer
              feedMode={true}
              handleAction={props.handleAction}
            />
            <Posts
              mode="feed"
              feedMode={true}
              myId={props.myId}
              myAvatar={props.myAvatar}
              posts={props.posts}
              handleAction={props.handleAction}
            />
            {props.loadMore && props.posts.length >= 5 && <InfiniteScroll
              children={[]}
              pageStart={0}
              loadMore={handlefetchMore}
              hasMore={true}
              loader={
                <Loading
                  margin="0"
                  className={props.fadeoutLoader ? 'animated slideOutLeft' : ''}
                  key={`${Date.now()}-loading-infinite-feed`}
                />
              }
            />}
          </StyledDiv>
        )
      }}
    </Query>
  )
}

export default FeedScrollQuery

const StyledDiv = styled.div`
  margin: 0;
  padding: 0;
  display: block;
`
