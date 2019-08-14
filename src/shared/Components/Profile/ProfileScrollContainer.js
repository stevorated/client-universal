import React, { useState } from 'react'
import { Button } from 'reactstrap'
import { Loading, Posts } from '..'
import { Query } from 'react-apollo'
import { FETCH_USERS_POSTS } from '../../Store/Apollo/Queries'
import InfiniteScroll from 'react-infinite-scroller'
import { PostFormContainer } from '../Post'
import styled from 'styled-components'

function ProfileScrollContainer(props) {
  // console.log(props)
  const { id, posts } = props
  const length = posts.length
  return (
    <Query
      // fetchPolicy="network-only" // IMPORTANT
      query={FETCH_USERS_POSTS}
      variables={{ id, limit: 5, skip: 0 }}
      onCompleted={({ getUsersPosts }) => {
          props.handleAction('fetchUsersPosts', { data: getUsersPosts, id })
        }
      }
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <Loading />
        const handleFetchMore = () => {
          if (props.posts.length <= 5) return null
          fetchMore({
            variables: {
              id: props.id,
              skip: length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult.getUsersPosts.length) return props.setLoadMore(false)
              {/* if (fetchMoreResult.getUsersPosts.length) return null */}
              props.handleAction('fetchUsersPosts', {
                data: [...fetchMoreResult.getUsersPosts],
                id
              })
            }
          })
        }
        return (
          <StyledDiv className="text-center mt-3">
            <PostFormContainer
              profileMode={true}
              id={props.id}
              myProfile={props.myId === props.id}
              handleAction={props.handleAction}
              // createPost={props.createPost}
            />
            <Posts
              mode="usersProfile"
              profileMode={true}
              myId={props.myId}
              myAvatar={props.myAvatar}
              posts={props.posts}
              handleAction={props.handleAction}
            />
            {props.loadMore && props.posts.length >= 5 && <InfiniteScroll
              children={[]}
              pageStart={0}
              loadMore={handleFetchMore}
              hasMore={props.loadMore}
              loader={
                <Loading margin="1" key={`${Date.now()}-loading-infinite-profile`} />
              }
            />}
          </StyledDiv>
        )
      }}
    </Query>
  )
}

export default ProfileScrollContainer

const StyledDiv = styled.div`
  margin: 0;
  padding: 0;
  margin-bottom: 20rem;
`
