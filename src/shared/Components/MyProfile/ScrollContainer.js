import React, { Fragment } from 'react'
import { Container } from 'reactstrap'
import { PostFormContainer } from '../Post'
import { Posts } from '../Post'
import styled from 'styled-components'
import { QueryMorePosts } from '../Post'

function ScrollContainer(props) {
  // console.log(props)
  return (
    <StyledDiv className="text-center">
      <PostFormContainer
        myPostsMode={true}
        // createPost={props.createPost}
        handleAction={props.handleAction}
      />
      <QueryMorePosts
        setLoadMore={props.setLoadMore}
        loadMore={props.loadMore}
        myId={props.myId}
        myAvatar={props.myAvatar}
        posts={props.posts}
        handleAction={props.handleAction}
        // fetchMoreMyPosts={props.fetchMoreMyPosts}
        posts={props.posts}
      />
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  margin: 0;
  padding: 0;
  /* display: block; */
  /* margin-bottom: 20rem; */
`

export default ScrollContainer
