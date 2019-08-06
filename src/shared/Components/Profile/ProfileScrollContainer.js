import React, { useState } from 'react'
import { Button } from 'reactstrap'
import { Loading, Posts } from '..'
import { Query } from 'react-apollo'
import { FETCH_USERS_POSTS } from '../../Store/Apollo/Queries'
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
        if (!posts.length) {
          props.handleAction('fetchUsersPosts', { data: getUsersPosts, id })
          // props.fetchPosts(getUsersPosts, id)
        }
      }}
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <Loading />
        const handleFetchMore = () => {
          fetchMore({
            variables: {
              id: props.id,
              skip: length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return prev
              }
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

              // fetchPosts={props.fetchPosts}
              // deletePostAction={props.deletePostAction}
              // likePostAction={props.likePostAction}
              // deleteCommentAction={props.deleteCommentAction}
              // pushComment={props.pushComment}
            />
            <Button
              size="sm"
              className={`my-5 btn-mainclr`}
              onClick={handleFetchMore}
            >
              Load More
            </Button>
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
