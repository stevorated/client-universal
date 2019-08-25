import React, { Component } from 'react'
import { Container, Row, Col, Progress } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { HelmetComponent, SummeryComponent } from '../../Components'
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
      perWisdom: 52,
      perLikeWisdom: 25,
      perEvent: 200,
      perEventLike: 110,
      perSelfLike: 2,
      perSelfEventLike: 3,
      perSelfFollow: 4
    }
  }

  render() {
    const { auth } = this.props
    const data = {
      likes: auth.posts.length
        ? auth.posts
            .map(post => post.likes.length ? post.likes.length : 0)
            .reduce((a, b) => a + b)
        : 0,
      wisdoms: auth.posts.length,
      events: auth.events.length,
      eventLikes: auth.events.length
        ? auth.events
            .map(event => event.followers.length ? event.followers.length : 0)
            .reduce((a, b) => a + b)
        : 0,
      show1: false,
      animation1: '',
      selfLikes: auth.likes.length,
      selfEventLikes: auth.followingEvents.length,
      selfFollows: auth.following.length
    }
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
          className="offset-lg-3 order-3 order-lg-2 animated fadeIn mt-lg-3 pr-lg-4"
        >
          <SummeryComponent
            state={this.state}
            data={data}
            header="Engage Page"
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
