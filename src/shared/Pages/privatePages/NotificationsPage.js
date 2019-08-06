import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { HelmetComponent, NotificationsContainer } from '../../Components'
import { fetchMyNotifications, logoutUser } from '../../Store/actions'
import requireAuth from '../../HOC/requireAuth'
import checkLoggedIn from '../../HOC/checkLoggedIn'
import Menu from '../../Routes/Menu'
import { mediaQueries } from '../../Utils'


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
        <Col lg="9" className="offset-lg-3 order-3 order-lg-2 animated fadeIn" >
          <NotificationsContainer />
        </Col>
      </Row>
    )
  } 
}

function mapStateToProps({ }) {
  return {  }
}

export default {
  component: connect(mapStateToProps, { logoutUser})(checkLoggedIn(requireAuth(NotificationsPage))),
  loadData: ({ dispatch }) => dispatch(fetchMyNotifications())
}
const FloatLeft = styled(Col)`
  display: none;
  position: static!important;
  top: 3.5rem;
  left: 0rem;
  ${mediaQueries.lg`
  display: block;
  position: fixed!important;
  `}
  `
