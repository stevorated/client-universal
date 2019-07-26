import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Query } from 'react-apollo'
import { GET_ME } from '../Store/Apollo/Queries'
import { checkUserLoggedOut } from '../Store/actions'

export default (ChildComponent) => {
  class HOC extends Component {
    constructor(props){
      super(props)
    }
    render() {
      return (
        <Query
        query={GET_ME}
        pollInterval={8000}
        onError={(error)=> {console.log('error in checkLoggedIn')}}
      >
        {({ loading, error, data, startPolling, stopPolling }) => {
          if (error) {
            // console.log('HOC ERROR', error)
            console.log('loggin OUt')
            {this.props.checkUserLoggedOut()}
            return <Redirect to="/login" />
          }else {
            return (
              <ChildComponent {...this.props} />
            )
          } 
        }}
      </Query>
        
      )
      }
    }

 return connect(undefined, {checkUserLoggedOut})(HOC)
}