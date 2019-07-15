import React, { Fragment } from 'react'
import { Container } from 'reactstrap'
import { PostFormContainer } from '../Post'
import { Posts } from '../Post'
import styled from 'styled-components'
import { QueryMorePosts } from '../Post'

function ScrollContainer() {
  return (
    <StyledDiv className="text-center">
      <PostFormContainer myPostsMode={true} />
      <Posts myPostsMode={true} />
      <QueryMorePosts />
    </StyledDiv>
  )
}

const StyledDiv = styled.div `
  margin: 0;
  padding: 0;
  /* display: block; */
  /* margin-bottom: 20rem; */
`

export default ScrollContainer