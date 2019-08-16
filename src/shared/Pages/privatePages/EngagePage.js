import React, { Component } from 'react'
import { Container, Row, Col, Progress } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { HelmetComponent, SummeryComponent, } from '../../Components'
import requireAuth from '../../HOC/requireAuth'
import checkLoggedIn from '../../HOC/checkLoggedIn'
import Menu from '../../Routes/Menu'
import { Line } from '../../Elements'

import { mediaQueries } from '../../Utils'

export class EngagePage extends Component {
  constructor(props) {
    super(props)
    this.title = 'engage gauge'
    this.state = {
      wisdoms: 53,
      likes: 121,
      events: 38,
      eventLikes: 127,
      // resposts: 26,

      monthWisdoms: 24,
      monthLikes: 42,
      monthEvents: 10,
      monthEventLikes: 60,

      weekWisdoms: 10,
      weekLikes: 24,
      weekEvents: 2,
      weekEventLikes: 27

    }
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
          className="offset-lg-3 order-3 order-lg-2 animated fadeIn mt-lg-3"
        >
          <SummeryComponent state={this.state} />
          {/* <Line className="mx-5 mb-5" /> */}
          <SummeryComponent
            state={{
              wisdoms: this.state.monthWisdoms,
              likes: this.state.monthLikes,
              events: this.state.monthEvents,
              eventLikes: this.state.monthEventLikes,
            }}
            header="Last Month"
          />
          {/* <Line className="mx-5 mb-5" /> */}
          <SummeryComponent
            state={{
              wisdoms: this.state.weekWisdoms,
              likes: this.state.weekLikes,
              events: this.state.weekEvents,
              eventLikes: this.state.weekEventLikes,
            }}
            header="Last Week"
          />
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
