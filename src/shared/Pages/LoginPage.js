import React, { Fragment, useState, Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoginForm, HelmetComponent, Loading } from '../Components'
import forceLoggedIn from '../HOC/forceLoggedIn'
import { isEmail, isLength } from 'validator'
import { loginUser } from '../Store/actions'

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
      formInvalid: null
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

  handleLogin = async (e) => {
    e.preventDefault()
    
    this.setState({ errorCounter: this.state.errorCounter + 1, formInvalid: true })
    if (this.state.errorCounter <= 2) {
      try {
        if (this.state.emailValid && this.state.passwordValid) {
          this.setState({loading: true})
          const res = await this.props.loginUser(this.state.email, this.state.password)
        }
      } catch (error) {

        this.setState({ loading: false })
      }

    } else {
      console.log('SHIIITT')
      this.setState({ redirect: true })
    }
  }
  render() {
    return !this.state.redirect ? (
      <div className="pt-4 text-center" style={{position: 'relative'}}>
        <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
        
        <LoginForm
          state={this.state}
          setState={this.setState}
          handleChangeInput={this.handleChangeInput}
          handleLogin={this.handleLogin}
        
        />
        {this.state.loading && <Loading size={`10`} style={{ position: 'fixed', bottom: '10%', left: '48%', zIndex: '100' }} />}
        
      </div>
    )
      : (<Redirect to="/register" />)
  }
}

export default {
  component: connect(undefined, { loginUser })(forceLoggedIn(LoginPage))
}