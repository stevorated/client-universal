import React, { Fragment, useState, Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoginForm, HelmetComponent, Loading, ForgotPasswordContainer } from '../../Components'
import forceLoggedIn from '../../HOC/forceLoggedIn'
import { isEmail, isLength } from 'validator'
import { loginUser } from '../../Store/actions'
import { Alert } from 'reactstrap'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.title = 'Login'
    this.state = {
      errorCounter: 0,
      redirect: false,
      emailValid: false,
      emailInvalid: false,
      email: '',
      passwordValid: false,
      passwordInvalid: false,
      password: '',
      formError: false,
      loading: false,
      formInvalid: null,

      myEmail: '',
      myEmailGood: null,
      myEmailError: null,
      showErrors: null,
      emailSent: false
    }
  }

  handleChangeInput = (e) => {
    const input = e.target.value
    switch (e.target.name) {
      case 'email':
        this.setState({ emailInvalid: false, emailValid: false })
        if (input && !isEmail(input)) {
          this.setState({ emailInvalid: true })
        } else if (input && isEmail(input)) {
          this.setState({ emailInvalid: false })
          this.setState({ emailValid: true })
        }
        this.setState({ email: e.target.value })
        break
      case 'password':
        this.setState({ passwordInvalid: false, passwordValid: false })
        if (input && !input.match(/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%#*^?&]{6,30}$/)) {
          // setPasswordError(true)
          this.setState({ passwordInvalid: true })
        } else if (input && input.match(/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%#*^?&]{6,30}$/)) {
          this.setState({ passwordInvalid: false })
          this.setState({ passwordValid: true })
        }
        this.setState({ password: e.target.value })
        break
      default:
        break
    }
  }

  handleChange = newData => {
    this.setState({ ...newData })
  }

  handleState = newData => {
    this.setState(newData)
  }

  handleLogin = async (e) => {
    e.preventDefault()

    this.setState({ errorCounter: this.state.errorCounter + 1 })
    if (this.state.errorCounter <= 2) {
      try {
        if (this.state.emailValid && this.state.passwordValid) {
          this.setState({ loading: true, formInvalid: false, formError: false })
          const res = await this.props.loginUser(this.state.email, this.state.password)
        } else {
          this.setState({ loading: false, formInvalid: true, formError: false })
        }
      } catch (error) {
        this.setState({ loading: false, formError: true, formInvalid: false })
      }

    } else {
      this.setState({ redirect: true, formInvalid: true, formError: false })
    }
  }

  handleAction = (type, payload) => {
    switch (type) {
      case 'success':
        // console.log('fetchMyPosts')
        this.setState({emailSent: true})
        break
      default:
        console.log('unKnownAction', type, payload)
        break
    }
  }
  render() {
    return !this.state.redirect ? (
      <div className="pt-4 text-center" style={{ position: 'relative' }}>
        <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
        
        {this.state.emailSent && <Alert color="success">email sent! check your email</Alert> } 
        <LoginForm
          state={this.state}
          setState={this.setState}
          handleChangeInput={this.handleChangeInput}
          handleLogin={this.handleLogin}

        />
        {this.state.loading && <Loading size={`10`} style={{ position: 'fixed', bottom: '10%', left: '48%', zIndex: '100' }} />}
        <ForgotPasswordContainer
          handleAction={this.handleAction}
          state={this.state}
          handleChange={this.handleChange}
          handleState={this.handleState}

        />
      </div>
    )
      : (<Redirect to="/register" />)
  }
}

export default {
  component: connect(undefined, { loginUser })(forceLoggedIn(LoginPage))
}