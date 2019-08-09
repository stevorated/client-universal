import React from "react"
import { connect } from "react-redux"
import { Query } from "react-apollo"
import { fetchPost } from "../../Store/actions"
import { Posts } from "../Post"
import { Loading } from "../"
import { FETCH_FEED } from "../../Store/Apollo/Queries"
import styled from "styled-components"

const SinglePostContainer = props => {
  // console.log(props)
  return (
    <Query
      query={FETCH_FEED}
      variables={{ id: props.id, limit: 1, skip: 0 }}
      onCompleted={({ getPosts }) => {
        props.handleAction('fetchPost', { data: getPosts })
      }}
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <Loading />
        if (error) return <Loading />
        return (
          <StyledDiv className="text-center">
            <Posts
              data-test="posts"
              mode="singlePost"
              myId={props.myId}
              myAvatar={props.myAvatar}
              posts={props.singlePost}              
              handleAction={props.handleAction}
              singlePostMode={true}
              show
            />
          </StyledDiv>
        )
      }}
    </Query>
  )
}

export default SinglePostContainer

const StyledDiv = styled.div`
  margin: 0;
  padding: 0;
  display: block;
`
