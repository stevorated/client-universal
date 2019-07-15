import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Loading } from '../Components'
import { isMongoId } from 'validator' 

export default (ChildComponent) => {
  class ForceLoggedIn extends Component {
    render() {
        switch (this.props.auth) {
          case null:
            return <ChildComponent {...this.props}/>
          default:
            if(isMongoId(this.props.auth.id)) {
              return <Redirect to="/feed" />
            } else {
              return <ChildComponent {...this.props}/>
            }
        }
      }
    }
function mapStateToProps({ auth }) {
  return { auth }
}
 return connect(mapStateToProps)(ForceLoggedIn)
}
