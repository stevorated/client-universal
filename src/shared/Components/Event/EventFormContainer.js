import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Mutation, ApolloConsumer } from 'react-apollo'
import { createEventAction } from '../../Store/actions'
import { CREATE_EVENT } from '../../Apollo/Mutaions'
import EventFormModal from './EventFormModal'

class EventFormContainer extends Component {
  constructor(props) {
    super(props)
    
  }
  render() {
    return (
        
        <ApolloConsumer>
          {client => (
            <Mutation
              mutation={CREATE_EVENT}
              onCompleted={({createEvent}) => this.props.createEventAction(createEvent)}     
              refetchQueries={[
                // {query: FETCH_USERS_POSTS, variables: { id: this.props.id }}
              ]}
              >
              {(createEvent, {loading, error}) => {
                if (error) {
                  for (let err of error.graphQLErrors) {
                    console.log(err.extensions.exception.errors)
                    return (
                      <EventFormModal
                      createEvent={createEvent}
                      round={this.props.round}
                      buttonLabel={this.props.buttonLabel}
                      />
                    )
                  }
                }
                return( 
                  <EventFormModal
                  createEvent={createEvent}
                  round={this.props.round}
                  buttonLabel={this.props.buttonLabel}
                  buttonSize={this.props.buttonSize}
                  className={this.props.className}
                  />
                ) 
              }}
              
            </Mutation>
          )}
        </ApolloConsumer>
      
    )
  }
}

export default connect(undefined, { createEventAction })(EventFormContainer)
