import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Mutation, ApolloConsumer } from 'react-apollo'
import { createEventAction } from '../../Store/actions'
import { CREATE_EVENT } from '../../Store/Apollo/Mutaions'
import { FETCH_CALANDER_EVENTS } from '../../Store/Apollo/Queries'
import EventFormModal from './EventFormModal'
import { Loading } from '..'

function EventFormContainer(props) {
  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={CREATE_EVENT}
          onCompleted={({ createEvent }) => {
            // props.createEventAction(createEvent)
            props.handleAction('createEventAction', { data: createEvent })
          }}
          refetchQueries={[{ query: FETCH_CALANDER_EVENTS }]}
        >
          {(createEvent, { loading, error }) => {
            if(loading) return <Loading />
            if (error) {
              for (let err of error.graphQLErrors) {
                return (
                  <EventFormModal
                    createEvent={createEvent}
                    round={props.round}
                    buttonLabel={props.buttonLabel}
                  />
                )
              }
            }
            return (
              <EventFormModal
                createEvent={createEvent}
                round={props.round}
                buttonLabel={props.buttonLabel}
                buttonSize={props.buttonSize}
                className={props.className}
              />
            )
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  )
}

export default EventFormContainer
