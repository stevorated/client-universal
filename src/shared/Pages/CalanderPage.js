import React, { Component } from 'react'
import { Container, Row, Col, Card } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { HelmetComponent, CalanderContainer } from '../Components'
import { fetchFeed, clearFeed, fetchCurrentUser } from '../Store/actions'
import requireAuth from '../HOC/requireAuth'
import checkLoggedIn from '../HOC/checkLoggedIn'
import Menu from '../Routes/Menu'

import { mediaQs, mediaQueries } from '../Utils'

class CalanderPage extends Component {

  constructor (props) {
    super(props)
    this.title = 'Calander'
    this.fname = this.props.auth.fname
  }

  render() {
    return(
      <Row>
        <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
        <FloatLeft lg="3">
          <Menu />
        </FloatLeft>
        <Col lg="12" className="order-3 order-lg-2 animated fadeIn  mt-lg-4 mb-5" >
          <CalanderContainer 
          className="" 
          name={this.fname} 
          days={31}
          startDay={4}
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
  component: connect(mapStateToProps, {})(requireAuth(checkLoggedIn(CalanderPage))),
  loadData: ({ dispatch }) => {
    dispatch(fetchCurrentUser())
  }
}
const FloatLeft = styled(Col)`
  position: static!important;
  top: 3.5rem;
  left: 0rem;
  ${mediaQueries.lg`
  display: none;
  `}
  `


