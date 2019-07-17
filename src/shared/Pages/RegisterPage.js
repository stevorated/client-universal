import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Mutation, ApolloConsumer } from 'react-apollo'
import { REGISTER_USER_MUT } from '../Apollo/Mutaions'
import { RegisterForm, Loading } from '../Components'
import forceLoggedIn from '../HOC/forceLoggedIn'
import { registerUser } from '../Store/actions'

class RegisterPage extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    formGood: false,
    retry: false,
    fname: '',
    lname: '',
    email: '', 
    username: '',
    password: '',
    fnameGood: false,
    fnameError: false,
    lnameGood: false,
    lnameError: false,
    usernameGood: false,
    usernameError: false,
    emailGood: false,
    emailError: false,
    passwordGood: false,
    passwordError: false,
    submitError: null,
    showServerError: true
  }
  
  handleFormState = (data) => {
    this.setState(data)
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Mutation
            mutation={REGISTER_USER_MUT}
            onCompleted={({signUp})=>{
              this.props.registerUser({signUp})
            }}
          >
            {(signUp, {loading, error}) => {
              if (error) {
                for (let err of error.graphQLErrors) {
                  return (
                  <div className="text-center">
                    <RegisterForm 
                    register={signUp} 
                    errors={err.extensions.exception.errors} 
                    state={this.state} 
                    handleFormState={this.handleFormState} 
                    />
                    {loading && <Loading />}
                  </div>
                  )
                }
              }
              return (
              <div className="text-center">
              
                <RegisterForm 
                register={signUp} 
                state={this.state} 
                handleFormState={this.handleFormState} 
                />
                
                {loading && <Loading />}
              </div>
              )
            }}
          </Mutation>
        )}
      </ApolloConsumer>
    )

  }
}

export default {
  component: connect(undefined, { registerUser })(forceLoggedIn(RegisterPage))
}