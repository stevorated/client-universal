import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { HelmetComponent } from '../../Components'
import { fetchFeed, clearFeed, logoutUser } from '../../Store/actions'
import requireAuth from '../../HOC/requireAuth'
import checkLoggedIn from '../../HOC/checkLoggedIn'
import Menu from '../../Routes/Menu'

import { mediaQueries } from '../../Utils'

export class SettingsPage extends Component {

  constructor (props) {
    super(props)
    this.title = 'Settings'
    this.state = {
      leaveClass: 'animated fadeOutUp'
    }
  }
  componentWillUnmount = () => {
    
  }

  render() {
    return(
      <Row data-test="mainDiv" className="text-center">
        <HelmetComponent data-test="helmet" pageTitle={this.title} ogTitle={this.title} />
        <FloatLeft data-test="leftCol" lg="3">
          <Menu />
        </FloatLeft>
        <Col data-test="mainCol" lg="6" className="offset-lg-3 order-3 order-lg-2 animated fadeIn" >
          <h1>SETTINGS</h1>
        </Col>
        <Col data-test="rightCol" lg="3" className="order-2 order-lg-3 mt-2 animated fadeIn">
        </Col>
      </Row>
    )
  } 
}

function mapStateToProps({ }) {
  return { }
}

export default {
  component: connect(mapStateToProps, {})(checkLoggedIn(requireAuth(SettingsPage)))
}
const FloatLeft = styled(Col)`
  position: static!important;
  top: 3.5rem;
  left: 0rem;
  ${mediaQueries.lg`
  position: fixed!important;
  `}
  `
