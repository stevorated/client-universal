import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Query } from 'react-apollo'
import { GET_ME } from '../Store/Apollo/Queries'
import { checkUserLoggedOut } from '../Store/actions'

export default ChildComponent => {
  class HOC extends Component {
    constructor(props) {
      super(props)
    }
    render() {
      return (
        <Query query={GET_ME} pollInterval={5000}>
          {({ error }) => {
            if (error) {
              const authError = error.graphQLErrors.filter(
                graphQLError =>
                  graphQLError.extensions.code === 'UNAUTHENTICATED'
              )
              if (authError.length) {
                console.log('loggin you OUt')
                this.props.checkUserLoggedOut()
                return <Redirect to="/login" />
              } else {
                return <ChildComponent {...this.props} />
              }
              // console.log('HOC ERROR', error)
            } else {
              return <ChildComponent {...this.props} />
            }
          }}
        </Query>
      )
    }
  }

  return connect(
    undefined,
    { checkUserLoggedOut }
  )(HOC)
}
