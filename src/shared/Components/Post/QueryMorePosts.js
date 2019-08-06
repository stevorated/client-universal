import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { fetchMoreMyPosts } from '../../Store/actions'
import { Button } from 'reactstrap'
// import Posts from '.'
import { Posts, Loading } from '../'

import { FETCH_MORE_POSTS, GET_MA_POSTS } from '../../Store/Apollo/Queries'

const QueryMorePosts = props => {
  const length = props.posts.length
  return (
    <Query
      query={FETCH_MORE_POSTS}
      variables={{ limit: 5, skip: 5 }}
      onCompleted={({ getMyPosts }) => {
        props.handleAction('fetchMoreMyPosts', { data: getMyPosts })
        // props.fetchMoreMyPosts(getMyPosts)
      }}
      // refetchQueries={[{query:GET_MA_POSTS, variables:{limit: 10, skip: 0 }}]}
    >
      {({ loading, error, data, fetchMore }) => {
        const handleFatchMore = () => {
          fetchMore({
            variables: {
              skip: length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev
              props.handleAction('fetchMoreMyPosts', {
                data: [...fetchMoreResult.getMyPosts]
              })
              // props.fetchMoreMyPosts(
              //   [...fetchMoreResult.getMyPosts]
              // )
            }
          })
        }
        if (loading) return <Loading />
        if (error) return <h1>`Error! ${error}`</h1>
        return (
          <Fragment>
            <Posts
              mode="myProfile"
              myPostsMode={true}
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
              className="mb-5 btn-mainclr"
              onClick={handleFatchMore}
            >
              get More
            </Button>
          </Fragment>
        )
      }}
    </Query>
  )
}

export default QueryMorePosts
