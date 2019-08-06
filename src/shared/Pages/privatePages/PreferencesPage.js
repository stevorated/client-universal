import React, { Component } from "react"
import { Row, Col } from "reactstrap"
import styled from "styled-components"
import { connect } from "react-redux"
import { HelmetComponent } from "../../Components"
import requireAuth from "../../HOC/requireAuth"
import checkLoggedIn from "../../HOC/checkLoggedIn"
import Menu from "../../Routes/Menu"

import { mediaQueries } from "../../Utils"

export class PreferencesPage extends Component {
  constructor(props) {
    super(props)
    this.title = "Prefs"
  }

  render() {
    return (
      <Row data-test="main-div" className="text-center">
        <HelmetComponent
          data-test="helmet"  
          pageTitle={this.title}
          ogTitle={this.title}
        />
        <FloatLeft data-test="leftCol" lg="3">
          <Menu />
        </FloatLeft>
        <Col
          lg="6"
          data-test="mainCol"
          className="offset-lg-3 order-3 order-lg-2 animated fadeIn"
        >
          <h1>PREFS PAGE</h1>
        </Col>
        <Col
          lg="3"
          data-test="rightCol"
          className="order-2 order-lg-3 mt-2 animated fadeIn"
        />
      </Row>
    )
  }
}

function mapStateToProps({ users, posts, feed }) {
  return { users, posts, feed }
}

export default {
  component: connect(
    mapStateToProps,
    {}
  )(checkLoggedIn(requireAuth(PreferencesPage)))
}
const FloatLeft = styled(Col)`
  position: static !important;
  top: 3.5rem;
  left: 0rem;
  ${mediaQueries.lg`
  position: fixed!important;
  `}
`
