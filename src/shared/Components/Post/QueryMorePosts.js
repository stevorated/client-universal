import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { fetchMoreMyPosts } from '../../Store/actions'
import { Button } from 'reactstrap'
import InfiniteScroll from 'react-infinite-scroller'
// import Posts from '.'
import { Posts, Loading } from '../'

import { FETCH_MORE_POSTS, GET_MA_POSTS } from '../../Store/Apollo/Queries'

const QueryMorePosts = props => {

  const length = props.posts.length

  return (
    <Query
      query={FETCH_MORE_POSTS}
      variables={{ limit: 5, skip: length < 5 ? length : 5 }}
      onCompleted={({ getMyPosts }) => {
        if(length <= 10) {
          props.handleAction('fetchMoreMyPosts', { data: getMyPosts })
        }
      }}
      // refetchQueries={[{query:GET_MA_POSTS, variables:{limit: 10, skip: 0 }}]}
    >
      {({ loading, error, data, fetchMore }) => {
        const handleFetchMore = () => {
          
          fetchMore({
            variables: {
              skip: length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult.getMyPosts.length) return props.setLoadMore(false)
              if (length === 0) return null
              props.handleAction('fetchMoreMyPosts', {
                data: [...fetchMoreResult.getMyPosts]
              })  
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
            />
            {props.loadMore && props.posts.length >=5 &&<InfiniteScroll
              children={[]}
              pageStart={0}
              loadMore={handleFetchMore}
              hasMore={props.loadMore}
              loader={
                <Loading margin="1" key={`${Date.now()}-loading-infinite-profile`} />
              }
            />}
          </Fragment>
        )
      }}
    </Query>
  )
}

export default QueryMorePosts
