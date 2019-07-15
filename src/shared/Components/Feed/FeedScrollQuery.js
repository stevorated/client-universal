import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { fetchFeed } from '../../Store/actions'
import { Posts } from '../Post'
import { Loading } from '../'
import { FETCH_FEED } from '../../Apollo/Queries'
import { PostFormContainer } from '../Post'
import styled from 'styled-components'

const FeedScrollQuery = (props) => {
  return (
    <Query
      // fetchPolicy='network-only' // IMPORTANT
      query={FETCH_FEED}
      variables={{ limit: 5, skip: 0}}
      onCompleted={
        ({ getPosts }) => {
          props.fetchFeed(getPosts, props.feed.length )
        }
      }
    // refetchQueries={[{query:GET_MA_POSTS, variables:{limit: 10, skip: 0 }}]}
    >
      {({ loading, error, data, fetchMore }) => {
        const handleFatchMore = () => {
          // console.log(props)
          fetchMore({
            variables: {
              skip: props.feed.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              // console.log(
              //   [...prev.getMyPosts, ...fetchMoreResult.getMyPosts]
              // )
              if (!fetchMoreResult) return prev
              props.fetchFeed(
                [...fetchMoreResult.getPosts]
              ) 
            }
          })
        }
        if (loading) return <Loading />
        if (error) return <Loading />
        return (
          <StyledDiv className="text-center">
            <PostFormContainer feedMode={true} />
            <Posts feedMode={true} />
            <Button className="mb-5" onClick={handleFatchMore}>Load More</Button>
          </StyledDiv>
        )
      }}
    </Query>
  )
}

const mapStateToProps = ({ feed }) => {
  return { feed }
}

export default connect(mapStateToProps, { fetchFeed })(FeedScrollQuery)

const StyledDiv = styled.div `
  margin: 0;
  padding: 0;
  display: block;
`


