import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Mutation, ApolloConsumer } from 'react-apollo'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBeer } from '@fortawesome/free-solid-svg-icons'
import { Loading } from '../'
import { LIKE_POST_MUT } from '../../Store/Apollo/Mutaions'
import { GET_MA_POSTS, FETCH_FEED } from '../../Store/Apollo/Queries'
import { likePostAction } from '../../Store/actions'

function LikePostMut(props) {
  const { post, likes } = props
  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={LIKE_POST_MUT}
          variables={{ id: post }}
          onCompleted={async ({ likePost }) => {
            props.likePostAction(likePost, post)
          }}
          // refetchQueries={[{ query: FETCH_FEED }, { query: GET_MA_POSTS }]}
        >
          {(likePost, { loading, error, called }) => {
            
            if (error) {
              for (let err of error.graphQLErrors) {
                // console.log(`${err.extensions.exception.errors}`)
              }
            }
            return <Fragment>
              <Button size="sm" className="btn-mainclr ml-2 px-2" onClick={likePost}>
              {likes.length} Likes 
              <FontAwesomeIcon icon={faBeer} className="ml-2 text-warning" />
              </Button>
            </Fragment>
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  )
}

export default connect(undefined, { likePostAction })(LikePostMut)
