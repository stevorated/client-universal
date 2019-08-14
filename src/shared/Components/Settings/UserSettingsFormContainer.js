import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Mutation, ApolloConsumer } from 'react-apollo'
import { Loading } from '..'
import { UPDATE_MY_PROFILE } from '../../Store/Apollo/Mutaions'
import styled from 'styled-components'
import UserSettingsForm from './UserSettingsForm'

const UserSettingsFormContainer = props => {
  const { fname, lname, username, bio } = props.state
  
  return (
    <ApolloConsumer>
    {client => (
      <Mutation
        mutation={UPDATE_MY_PROFILE}
        onCompleted={({ updateMyProfile }) => {
          props.handleAction('updateCurrentUser', { data: updateMyProfile })
        }}
      >
        {(updateMyProfile, { loading, error }) => {
          if(error) return <Loading />
          if (loading) return <Loading />
          return <UserSettingsForm updateMyProfile={updateMyProfile} state={props.state} handleChange={props.handleChange} handleState={props.handleState} />
        }}
      </Mutation>
    )}
  </ApolloConsumer>
    
  )
}

export default UserSettingsFormContainer
