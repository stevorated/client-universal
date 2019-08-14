import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Mutation, ApolloConsumer } from 'react-apollo'
import { Loading } from '..'
import { UPDATE_MY_PROFILE, START_RESET_PASSWORD } from '../../Store/Apollo/Mutaions'
import styled from 'styled-components'
import ForgotPassword from './ForgotPassword'

const ForgotPasswordContainer = props => {
  return (
    <ApolloConsumer>
    {client => (
      <Mutation
        mutation={START_RESET_PASSWORD}
        variables={{email: props.state.myEmail}}
        onCompleted={({ startResetPassword }) => {
          props.handleAction('success', { data: startResetPassword })
        }}
      >
        {(startResetPassword, { loading, error }) => {
          if(error) return <Loading />
          if (loading) return <Loading />
          return <ForgotPassword startResetPassword={startResetPassword} {...props} />
        }}
      </Mutation>
    )}
  </ApolloConsumer>
    
  )
}

export default ForgotPasswordContainer
