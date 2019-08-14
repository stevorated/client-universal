import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { HelmetComponent } from '../../Components'
import { fetchFeed, clearFeed, logoutUser } from '../../Store/actions'
import { FlatCardStatic } from '../../Elements'
import requireAuth from '../../HOC/requireAuth'
import checkLoggedIn from '../../HOC/checkLoggedIn'
import Menu from '../../Routes/Menu'

import { mediaQueries } from '../../Utils'

export class EngagePage extends Component {
  constructor(props) {
    super(props)
    this.title = 'engage gauge'
  }

  render() {
    return (
      <Row data-test="mainDiv" className="">
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
          className="offset-lg-3 order-3 order-lg-2 animated fadeIn mt-lg-5"
        >
          <Container className="text-center" style={{ fontSize: '1.5rem', height: '80vh' }}>
            <Row>
              <Col lg="3" xs="6">
                <div className="p-4 m-auto" style={{ height: '20vh' }} >
                  <div>265</div>
                  <div>wisdoms</div>
                </div>
              </Col>
              <Col lg="3" xs="6">
                <div className="p-4 m-auto" style={{ height: '20vh' }}>
                  <div>500</div>
                  <div>likes</div>
                </div>
              </Col>
              <Col lg="3" xs="6">
                <div className="p-4 m-auto" style={{ height: '20vh' }}> 
                <div>46</div>
                  <div>events</div>
                </div>
              </Col>
              <Col lg="3" xs="6">
                <div className="p-4 m-auto" style={{ height: '20vh' }}>
                <div>354</div>
                  <div>event likes</div>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps({ }) {
  return {}
}

export default {
  component: connect(
    mapStateToProps,
    {}
  )(checkLoggedIn(requireAuth(EngagePage)))
}
const FloatLeft = styled(Col)`
  position: static!important;
  top: 3.5rem;
  left: 0rem;
  ${mediaQueries.lg`
  position: fixed!important;
  `}import { FlatCardStatic } from './../../Elements/Cards';

  `
