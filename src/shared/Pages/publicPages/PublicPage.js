import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { HelmetComponent } from "../../Components"
import { Container, Row, Col } from "reactstrap"
import { transition, elevation, orange, mediaQueries } from "../../Utils"
import styled from "styled-components"

import forceLoggedIn from "../../HOC/forceLoggedIn"
import Logo from "../../../assets/logos/logo5.png"
import { FbLogin } from "../../Elements"
const linkLogo = Logo.replace("build", "").replace("/public", "")

export class PublicPage extends Component {
  constructor(props) {
    super(props)
    this.title = "Public Page"
    this.state = {
      redirect: false,
      fadeOut: "",
      where: ""
    }
  }

  goToRegister = () => {
    this.setState({
      fadeOut: "animated rollOut",
      where: "/register"
    })
    setTimeout(
      () =>
        this.setState({
          redirect: true
        }),
      1200
    )
  }
  gotoLogin = () => {
    this.setState({
      fadeOut: "animated hinge",
      where: "/login"
    })
    setTimeout(
      () =>
        this.setState({
          redirect: true
        }),
      1200
    )
  }

  render() {
    return this.state.redirect ? (
      <Redirect data-test="redirect" to={this.state.where} />
    ) : (
      <Container fluid
        data-test="main-div"
        style={{ minHeight: "90vh", paddingTop: "1rem" }}
        className={`animated fadeIn slow text-center ${this.state.fadeOut}`}
      >
        <HelmetComponent data-test="helmet" pageTitle={this.title} ogTitle={this.title} />
        <div className="mt-5">
          <h1 className="welcome-to">- Welcome to -</h1>
          <LogoHeader
            data-test="logo"
            className="logo-img m-auto"
            src={linkLogo}
            alt=""
            onClick={this.gotoLogin}
          />
        </div>
        <Row className="mt-4 text-center">
          <Col md={4}>
            <FbLogin />
          </Col>
          <Col md={4}>
            <OrHeader className="mt-4 sigmar-one">- OR -</OrHeader>
            <StyledBigButton
              data-test="loginBtn"
              style={{ fontFamily: "'Sigmar One', cursive" }}
              onClick={this.gotoLogin}
              className="big-btn"
            >
              Login
            </StyledBigButton>
          </Col>
          <Col md={4}>
            <StyledBigButton
              data-test="registerBtn"
              style={{ fontFamily: "'Sigmar One', cursive" }}
              onClick={this.goToRegister}
              className="big-btn"
            >
              Register
            </StyledBigButton>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default {
  component: forceLoggedIn(PublicPage)
}

const LogoHeader = styled.img`
  margin-top: 1rem;
  padding: 1rem;
  width: 80vw;
  background: ${orange};
  ${elevation[3]}
  ${transition({
    property: "box-shadow"
  })};
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
