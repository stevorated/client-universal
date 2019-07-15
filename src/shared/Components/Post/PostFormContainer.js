import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Mutation, ApolloConsumer } from 'react-apollo'
import { CREATE_POST_MUT } from '../../Apollo/Mutaions'
import { GET_MA_POSTS, FETCH_FEED, FETCH_USERS_POSTS } from '../../Apollo/Queries'
import { Loading } from '../'
import { PostForm } from './'
import { createPost } from '../../Store/actions'

class PostFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: ''
    }
  }
  
  
  handleFormState = (data) => {
    const currentState = this.state
    this.setState({
      ...currentState,
      ...data
    })
  }

  render() {
    const {profileMode, myProfile, feedMode, myPostsMode} = this.props
    return (profileMode && myProfile) || myPostsMode || feedMode ? (
      <ApolloConsumer>
        {client => (
          <Mutation
            mutation={CREATE_POST_MUT}
            onCompleted={({createPost}) => this.props.createPost(createPost)}     
            refetchQueries={[
              {query: FETCH_FEED},
              {query:GET_MA_POSTS}, 
              // {query: FETCH_USERS_POSTS, variables: { id: this.props.id }}
            ]}
            >
            {(createPost, {loading, error}) => {
              if (error) {
                for (let err of error.graphQLErrors) {
                  console.log(err.extensions.exception.errors)
                  return (
                    <Fragment>
                      <PostForm 
                      id={this.props.id}
                      errors={err.extensions.exception.errors} 
                      state={this.state} 
                      setFormState={this.handleFormState}
                      // createPost={createPost}
                      // myProfile={this.props.myProfile}
                      />
                    </Fragment>
                  )
                }
              }
              return( 
                <div className="p-2">
                  <PostForm
                  id={this.props.id}
                  state={this.state} 
                  setFormState={this.handleFormState}
                  createPost={createPost}  
                  // myProfile={this.props.myProfile}
                  // profileMode={this.props.profileMode}
                  />
                </div>
              ) 
            }}
            
          </Mutation>
        )}
      </ApolloConsumer>
    ): (<div></div>)

  }
}

export default connect(undefined, { createPost })(PostFormContainer)
