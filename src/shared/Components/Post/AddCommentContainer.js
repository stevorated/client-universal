import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Mutation, ApolloConsumer } from 'react-apollo'
import { CREATE_COMMENT_MUT } from '../../Store/Apollo/Mutaions'
import { GET_MA_POSTS, FETCH_FEED, FETCH_USERS_POSTS } from '../../Store/Apollo/Queries'
import { AddCommentForm , Loading } from '..'
import { pushComment } from '../../Store/actions'

class AddCommentContainer extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    formGood: false,
    retry: false,
    body: ''
  }
  
  handleFormState = (data) => {
    const currentState = this.state
    this.setState({
      ...currentState,
      ...data
    })
  }
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Mutation
            mutation={CREATE_COMMENT_MUT}
            onCompleted={({createComment}) => {
              this.props.pushComment(createComment)
              this.props.setShowForm(false)
              this.props.setShowComments(true)
            }}
            refetchQueries={[
              {query: FETCH_FEED},
              {query:GET_MA_POSTS, fetchPolicy: 'network-only'}, 
              {query: FETCH_USERS_POSTS, variables: { id: this.props.id }}
            ]}     
            >
            {(createComment, {loading, error}) => {
              // if (loading) return <Loading />
              if (error) {
                for (let err of error.graphQLErrors) {
                  // console.log(err.extensions.exception.errors)
                  return (
                    <AddCommentForm 
                    id={this.props.id}
                    openForm={this.props.openForm}
                    errors={err.extensions.exception.errors} 
                    state={this.state} 
                    setFormState={this.handleFormState}
                    createComment={createComment} 
                    />
                  )
                }
              }
              return( 
              <AddCommentForm 
              id={this.props.id}
              openForm={this.props.openForm} 
              state={this.state} 
              setFormState={this.handleFormState}
              createComment={createComment}  
              />
              )
            }}
          </Mutation>
        )}
      </ApolloConsumer>
    )

  }
}

export default connect(undefined, { pushComment })(AddCommentContainer)
