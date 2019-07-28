import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { HelmetComponent, NotificationsContainer } from '../Components'
import { fetchMyNotifications } from '../Store/actions'
import requireAuth from '../HOC/requireAuth'
import checkLoggedIn from '../HOC/checkLoggedIn'
import Menu from '../Routes/Menu'

import { mediaQs, mediaQueries } from '../Utils'

class NotificationsPage extends Component {

  constructor (props) {
    super(props)
    this.title = 'notifications'
  }

  render() {
    return(
      <Row className="text-center">
        <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
        <FloatLeft lg="3">
          <Menu />
        </FloatLeft>
        <Col lg="6" className="offset-lg-3 order-3 order-lg-2 animated fadeIn mt-lg-4 mb-5" >
          <NotificationsContainer />
        </Col>
        <Col lg="3" className="order-2 order-lg-3 mt-2 animated fadeIn">
        </Col>
      </Row>
    )
  } 
}

function mapStateToProps({ }) {
  return {  }
}

export default {
  component: connect(mapStateToProps, { })(checkLoggedIn(requireAuth(NotificationsPage))),
  loadData: ({ dispatch }) => dispatch(fetchMyNotifications())
}
const FloatLeft = styled(Col)`
  position: static!important;
  top: 3.5rem;
  left: 0rem;
  ${mediaQueries.lg`
  position: fixed!important;
  `}
  `


