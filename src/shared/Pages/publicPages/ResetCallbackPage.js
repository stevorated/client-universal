import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { HelmetComponent, ResetPasswordChangeFormContainer } from "../../Components"
import { Container, Row, Col } from "reactstrap"
import { transition, elevation, orange, mediaQueries } from "../../Utils"
import styled from "styled-components"

import forceLoggedIn from "../../HOC/forceLoggedIn"
import Logo from "../../../assets/logos/logo5.png"
import { FbLogin } from "../../Elements"
import { FlatCardStatic } from './../../Elements/Cards'
import { fetchCurrentUser } from './../../Store/actions/authActions'
const linkLogo = Logo.replace("build", "").replace("/public", "")

export class ResetCallbackPage extends Component {
  constructor(props) {
    super(props)
    this.token = props.match.params.token
    this.title = "Public Page reset"
    this.state = {
      redirect: false,
      fadeOut: "",
      where: "",

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

      passwordUpdated: null,
    }
  }

  handleChange = newData => {
    this.setState({ ...newData })
  }

  handleState = newData => {
    this.setState(newData)
  }

  handleAction = (type, payload) => {
    switch (type) {
      case 'fetchCurrentUser':

        break
      default:
        console.log('unKnownAction', type, payload)
        break
    }
  }

  render() {
    return (
      <Container
        data-test="main-div"
        className={`animated fadeIn slow text-center pt-5 ${this.state.fadeOut}`}
      >
        <HelmetComponent data-test="helmet" pageTitle={this.title} ogTitle={this.title} />
        <Row className="text-center">
          <Col lg="8" className="offset-lg-2">
            <FlatCardStatic style={{minHeight: '40vh'}}>
              <h1>your new password (twice)</h1>

              <ResetPasswordChangeFormContainer
                handleAction={this.handleAction}
                state={this.state}
                handleChange={this.handleChange}
                handleState={this.handleState}
                token={this.token}
              />
            </FlatCardStatic>

          </Col>
        </Row>
      </Container>
    )
  }
}

export default {
  component: forceLoggedIn(ResetCallbackPage)
}

const LogoHeader = styled.img`
  /* margin-top: 1rem; */
  /* padding: 1rem; */
  display: none;
  width: 70vw;
  background: ${orange};
  ${elevation[3]}
  ${transition({
  property: "box-shadow"
})};
${mediaQueries.lg`
display: block;
`}
`

const OrHeader = styled.h6`
  display: block;
  ${mediaQueries.md`
 display: none;
`}
`
const StyledBigButton = styled.button`
  ${elevation[4]}
`
