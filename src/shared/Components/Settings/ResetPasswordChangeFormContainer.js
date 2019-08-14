import React, { Fragment } from 'react'
import { Mutation, ApolloConsumer } from 'react-apollo'
import { Loading } from '..'
import { RESET_PASSWORD } from '../../Store/Apollo/Mutaions'

import ResetPasswordChangeForm from './ResetPasswordChangeForm'

const ChangePasswordContainer = props => {

  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={RESET_PASSWORD}
          variables={{ token: props.token, newPassword: props.state.newPassword }}
          errorPolicy="ignore"
          onError={() => props.handleState({
            newPassword: '',
            newPasswordConfirm: '',

            newPasswordError: null,
            newPasswordGood: null,
            newPasswordWeak: null,
            newPasswordBetter: null,
            newPasswordGreat: null,

            newPasswordConfirmGood: null,
            newPasswordConfirmError: null,
            newPasswordConfirmActive: false,
            passwordUpdated: false
          })}
          onCompleted={({ resetPassword }) => {
            if (resetPassword) {
              props.handleState({
                newPassword: '',
                newPasswordConfirm: '',

                newPasswordError: null,
                newPasswordGood: null,
                newPasswordWeak: null,
                newPasswordBetter: null,
                newPasswordGreat: null,

                newPasswordConfirmGood: null,
                newPasswordConfirmError: null,
                newPasswordConfirmActive: false,

                passwordUpdated: true
              })
              // setTimeout(() => {
              //   props.handleState({ passwordUpdated: null })
              // }, 3000)
            }
          }}
        >
          {(resetPassword, { loading, error }) => {
            if (loading) return <Loading />
            if (error) return <ResetPasswordChangeForm error={true} resetPassword={resetPassword} {...props} />
            return <ResetPasswordChangeForm resetPassword={resetPassword} {...props} />
          }}
        </Mutation>
      )}
    </ApolloConsumer>

  )
}

export default ChangePasswordContainer
