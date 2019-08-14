import React, { Fragment } from 'react'
import { Mutation, ApolloConsumer } from 'react-apollo'
import { Loading } from '..'
import { CHANGE_PASSWORD } from '../../Store/Apollo/Mutaions'

import ChangePassword from './ChangePassword'

const ChangePasswordContainer = props => {

  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={CHANGE_PASSWORD}
          errorPolicy="ignore"
          onCompleted={({ changePassword }) => {
            if (changePassword) {
              props.handleState({
                password: '',
                newPassword: '',
                newPasswordConfirm: '',

                passwordError: null,
                passwordGood: null,
                passwordWeak: null,
                passwordBetter: null,
                passwordGreat: null,

                newPasswordError: null,
                newPasswordGood: null,
                newPasswordWeak: null,
                newPasswordBetter: null,
                newPasswordGreat: null,

                newPasswordConfirmGood: null,
                newPasswordConfirmError: null,
                newPasswordConfirmActive: false,

                passwordUpdated: true,
                fade: ''
              })
              setTimeout(() => {
                props.handleState({ fade: 'animated fadeOut' })
                setTimeout(() => {
                props.handleState({ passwordUpdated: false })
              }, 3000)
              }, 3000)
              
            }
          }}
        >
          {(changePassword, { loading, error }) => {
            if (loading) return <Loading />
            if (error) return <ChangePassword error={true} changePassword={changePassword} {...props} />
            return <ChangePassword changePassword={changePassword} {...props} />
          }}
        </Mutation>
      )}
    </ApolloConsumer>

  )
}

export default ChangePasswordContainer
