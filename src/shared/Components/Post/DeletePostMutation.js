import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Mutation, ApolloConsumer } from 'react-apollo'

import DeletePostPopover from './DeletePostPopover'
import { Loading } from '../'
import { DELETE_POST_MUT } from '../../Store/Apollo/Mutaions'
import { GET_MA_POSTS, FETCH_FEED } from '../../Store/Apollo/Queries'
import { deletePostAction } from '../../Store/actions'

function DeletePostMutation(props) {
  const { post } = props
  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={DELETE_POST_MUT}
          variables={{ post }}
          onCompleted={async ({ deletePost }) => {
            props.deletePostAction(props.post)
          }}
          refetchQueries={[{ query: FETCH_FEED }, { query: GET_MA_POSTS }]}
        >
          {(deletePost, { loading, error, called }) => {
            if (loading) return <Loading size="2" margin="0" />
            if (error) {
              for (let err of error.graphQLErrors) {
                return <span>`${err.extensions.exception.errors}`</span>
              }
            }
            return <DeletePostPopover deletePost={deletePost} {...props} />
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  )
}

export default connect(undefined, { deletePostAction })(DeletePostMutation)
