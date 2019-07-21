import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Mutation, ApolloConsumer } from 'react-apollo'

import DeleteCommentPopover from './DeleteCommentPopover'
import { Loading } from '../'
import { DELETE_COMMENT_MUT } from '../../Store/Apollo/Mutaions'
import { GET_MA_POSTS, FETCH_FEED } from '../../Store/Apollo/Queries'
import { deleteCommentAction } from '../../Store/actions'

function DeleteCommentMutation(props) {
  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={DELETE_COMMENT_MUT}
          variables={{ id: props.comment }}
          onCompleted={({ deleteComment }) => {
            props.deleteCommentAction(props.comment, props.post)
          }}
          refetchQueries={[{ query: FETCH_FEED }, { query: GET_MA_POSTS }]}
        >
          {(deleteComment, { loading, error, called }) => {
            if (loading) return <Loading size="1" margin=".5" />
            if (error) {
              for (let err of error.graphQLErrors) {
                return <span>`${err.extensions.exception.errors}`</span>
              }
            }
            return (
              <DeleteCommentPopover
                deleteComment={deleteComment}
                {...props}
              />
            )
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  )

}

export default connect(undefined, { deleteCommentAction })(DeleteCommentMutation)
