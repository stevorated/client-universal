import React, { Component, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Mutation, ApolloConsumer } from 'react-apollo'
import { Button } from 'reactstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBeer } from '@fortawesome/free-solid-svg-icons'
// import { Loading } from '../'
import { FOLLOW_USER_MUT } from '../../Store/Apollo/Mutaions'
// import { GET_MA_POSTS, FETCH_FEED } from '../../Store/Apollo/Queries'
import { followUserAction } from '../../Store/actions'
import { orange } from '../../Utils'

function FollowUserMut(props) {
  const { user, followers, followUserAction, myId } = props
  console.log(followers)
  const iLike = followers && followers.length && followers.filter(
    follow => {
    return follow.id === myId
    }).length > 0
    ? true : false
  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={FOLLOW_USER_MUT}
          variables={{ id: user }}
          onCompleted={async ({ follow }) => {
            followUserAction(follow, user)
          }}
          // refetchQueries={[{ query: FETCH_FEED }, { query: GET_MA_POSTS }]}
        >
          {(follow, { loading, error, called }) => {
            
            if (error) {
              for (let err of error.graphQLErrors) {
                // console.log(`${err.extensions.exception.errors}`)
              }
            }
            if(iLike) return <Button size="sm" className="btn-mainclr mt-2 ml-1" onClick={follow}>unfollow</Button>
            return <Button size="sm" outline style={{color: orange, outlineColor: orange, borderColor: orange}} className="mt-2 ml-1" onClick={follow}>follow</Button>
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  )
}

export default connect(undefined, { followUserAction })(FollowUserMut)
