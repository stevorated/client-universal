import React from "react"
import { Button } from "reactstrap"
import { Query } from "react-apollo"
import { Posts } from "../Post"
import { Loading } from "../"
import { FETCH_FEED } from "../../Store/Apollo/Queries"
import { PostFormContainer } from "../Post"
import styled from "styled-components"

const FeedScrollQuery = props => {
  // console.log(props)
  return (
    <Query
      query={FETCH_FEED}
      variables={{ limit: 5, skip: 0 }}
      onCompleted={({ getPosts }) => {
        if (!props.posts.length) {  
          props.handleAction('fetchFeed', {data: getPosts, count: props.posts.length})
        }
      }}
    >
      {({ loading, error, data, fetchMore }) => {
        const handlefetchMore = () => {
          fetchMore({
            variables: {
              skip: props.posts.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev
              props.handleAction('fetchFeed', { data: [...fetchMoreResult.getPosts] })
            }
          })
        }
        if (loading) return <Loading />
        if (error) return <Loading />
        return (
          <StyledDiv className="text-center">
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
            <Button
              size="sm"
              className="my-5 btn-mainclr"
              onClick={handlefetchMore}
            >
              Load More
            </Button>
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
