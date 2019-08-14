import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {
  HelmetComponent,
  UserSettingsFormContainer,
  ChangePasswordContainer
  // ResetPasswordRequestForm
} from '../../Components'
import { updateCurrentUser } from '../../Store/actions'
import requireAuth from '../../HOC/requireAuth'
import checkLoggedIn from '../../HOC/checkLoggedIn'
import Menu from '../../Routes/Menu'

import { mediaQueries } from '../../Utils'
import { Line } from '../../Elements'

export class SettingsPage extends Component {
  constructor(props) {
    super(props)
    this.title = 'Settings'
    this.state = {
      fname: this.props.auth.fname,
      lname: this.props.auth.lname,
      username: this.props.auth.username,
      bio: this.props.auth.bio,
      fnameActive: false,
      lnameActive: false,
      usernameActive: false,
      bioActive: false,
      fnameError: null,
      fnameGood: null,
      lnameError: null,
      lnameGood: null,
      usernameError: null,
      usernameGood: null,
      bioError: null,
      bioGood: null,

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

      passwordUpdated: false,

      email: '',
      emailGood: null,
      emailError: null,
      showErrors: null

    }
    // console.log(this.state)
  }
  handleChange = newData => {
    this.setState({ ...newData })
  }

  handleState = newData => {
    this.setState(newData)
  }

  handleAction = (type, payload) => {
    switch (type) {
      case 'updateCurrentUser':
        // console.log('fetchMyPosts')
        this.props.updateCurrentUser(payload.data)
        break
      default:
        console.log('unKnownAction', type, payload)
        break
    }
  }

  render() {
    return (
      <Row data-test="mainDiv" className="text-center">
        <HelmetComponent
          data-test="helmet"
          pageTitle={this.title}
          ogTitle={this.title}
        />
        <FloatLeft data-test="leftCol" lg="3">
          <Menu />
        </FloatLeft>
        <Col
          data-test="mainCol"
          lg="9"
          className="offset-lg-3 order-3 order-lg-2 animated fadeIn mt-lg-4 mt-3 px-5"
        >
          <Line className="my-4 mx-3" />
          <h1 className="display-4">Profile Details</h1>
          <Line className="my-4 mx-3" />
          <UserSettingsFormContainer
            handleAction={this.handleAction}
            state={this.state}
            handleChange={this.handleChange}
            handleState={this.handleState}
          />
          <Line className="my-4 mx-3" />
          <h1 className="display-4">Password</h1>
          <Line className="my-4 mx-3" />
          {/* <ForgotPasswordContainer
            className="my-5"
            handleAction={this.handleAction}
            state={this.state}
            handleChange={this.handleChange}
            handleState={this.handleState}
          /> */}
          <ChangePasswordContainer
            className="my-5"
            handleAction={this.handleAction}
            state={this.state}
            handleChange={this.handleChange}
            handleState={this.handleState}
          />
        </Col>
      </Row>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default {
  component: connect(
    mapStateToProps,
    { updateCurrentUser }
  )(checkLoggedIn(requireAuth(SettingsPage)))
}
const FloatLeft = styled(Col)`
  position: static !important;
  top: 3.5rem;
  left: 0rem;
  ${mediaQueries.lg`
  position: fixed!important;
  `}
`
