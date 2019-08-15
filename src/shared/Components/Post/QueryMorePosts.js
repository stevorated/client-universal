import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import InfiniteScroll from 'react-infinite-scroller'
import { Posts, Loading } from '../'

import { FETCH_MORE_POSTS } from '../../Store/Apollo/Queries'

const QueryMorePosts = props => {

  const length = props.posts.length

  return (
    <Query
      query={FETCH_MORE_POSTS}
      variables={{ limit: 5, skip: length < 5 ? length : 5 }}
      onCompleted={({ getMyPosts }) => {
        const existingPosts = props.posts.map((post) => post.id)
        const diff = getMyPosts.filter(post => !existingPosts.includes(post.id))
        props.handleAction('fetchMoreMyPosts', { data: diff })
      }}
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
