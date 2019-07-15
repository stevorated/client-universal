import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { isMongoId } from 'validator' 

export default (ChildComponent) => {
  class RequireAuth extends Component {
    render() {
        switch (this.props.auth) {
          case null:
            return <Redirect to="/login" />
          default:
            if(isMongoId(this.props.auth.id)) {
              return <ChildComponent {...this.props}/>
            } else {
              return <Redirect to="/login" />
            }
        }
      }
    }

function mapStateToProps({ auth }) {
  return { auth }
}
 return connect(mapStateToProps)(RequireAuth)
}
